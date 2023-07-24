import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/internal/Subject';

import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Image } from '../models/Image';
import { SpinnerService } from './spinner/spinner.service';
import { MOCK_IMAGES } from './constants/images.constant';

@Injectable({
  providedIn: 'root',
})
export class ImageService
{
  private image$ = new Subject<Image>(); //observable
  private favorite$ = new Subject<Image>();
  private newImage$ = new Subject<Image>(); //observable
  private error$ = new Subject<string>(); //observable

  readonly url = environment.URL + '/api/';

  constructor(
    private http: HttpClient,
    private spinnerService: SpinnerService
  ) { }

  getPost(offset: number)
  {

    // this.image$.next(MOCK_IMAGES[Math.floor(Math.random() * 3)]);

    // return;

    this.spinnerService.requestStarted();
    let params = new HttpParams().set('offset', offset);
    this.http
      .get<{ image: Image }>(this.url + 'posts', { params: params })
      .pipe(
        map((imageData) =>
        {
          let t = 0;
          imageData.image.thumb = imageData.image.url.replace(/\//g, (match) =>
            ++t === 5 ? '/tr:w-500,h-500,c-at_max/' : match
          );
          return imageData.image;
        })
      )
      .subscribe({
        next: (image) =>
        {
          this.spinnerService.requestEnded();
          console.log(image);

          this.image$.next(image);
        },
        error: (err: { error: { message: string } }) =>
        {
          this.spinnerService.requestEnded();
          console.log('error', JSON.stringify(err));
        },
      });
  }

  getImageStream()
  {
    return this.image$.asObservable();
  }

  getFavorite(id: string)
  {
    if (id == undefined) return;

    let params = new HttpParams().set('id', id);

    console.log('fav', id);

    this.http
      .get<{ image: Image }>(this.url + 'favorites', { params: params })
      .pipe(
        map((imageData) =>
        {
          let t = 0;
          imageData.image.thumb = imageData.image.url.replace(/\//g, (match) =>
            ++t === 5 ? '/tr:w-500,h-500,c-at_max/' : match
          );
          return imageData.image;
        })
      )
      .subscribe({
        next: (image) => this.favorite$.next(image),
        error: (e) =>
        {
          if (e.status == 469) this.error$.next(id);
        },
        complete: () => console.log('complete'),
      });
  }

  addFavorite(image: Image)
  {
    let id = image._id;

    console.log(id);

    let favorites = JSON.parse(localStorage.getItem('favorites'))
      ? JSON.parse(localStorage.getItem('favorites'))
      : [];

    console.log(this.containsObject(image, favorites));


    if (this.containsObject(image, favorites)) return;

    favorites.push(image);
    console.log(favorites);
    localStorage.setItem('favorites', JSON.stringify(favorites));
    console.log("next");

    this.favorite$.next(image)
  }

  containsObject(obj: Image, list: Image[])
  {

    return list.some((elem: Image) =>
    {
      return elem._id === obj._id
    })
  }

  getErrorStream()
  {
    return this.error$.asObservable();
  }

  getFavoriteStream()
  {
    return this.favorite$.asObservable();
  }

  addImage(image: { name: string; image: string }): void
  {
    this.spinnerService.requestStarted();
    console.log(image);
    this.http
      .post<{ image: Image }>(this.url + 'posts', {
        image: image,
      })
      .pipe(
        map((imageData) =>
        {
          let t = 0;
          imageData.image.thumb = imageData.image.url.replace(/\//g, (match) =>
            ++t === 5 ? '/tr:n-media_library_thumbnail/' : match
          );
          return imageData.image;
        })
      )
      .subscribe({
        next: (image) =>
        {
          this.spinnerService.requestEnded();
          this.newImage$.next(image);
        },
        error: (err: { error: { message: string } }) =>
        {
          this.spinnerService.requestEnded();
          window.alert(err.error.message);
        },
      });
  }

  getNewImageStream()
  {
    return this.newImage$.asObservable();
  }

  deleteImage(id: string)
  {
    console.log('deleting image', id);
    return this.http.post<{ id: string }>(this.url + 'delete', { id: id });
  }
}
