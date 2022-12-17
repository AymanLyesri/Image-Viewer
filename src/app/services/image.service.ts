import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/internal/Subject';

import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Image } from '../models/Image';
import { SpinnerService } from './spinner/spinner.service';

@Injectable({
  providedIn: 'root',
})
export class ImageService {
  private image$ = new Subject<Image>(); //observable
  private newImage$ = new Subject<Image>(); //observable
  readonly url = environment.URL + '/api/';

  constructor(
    private http: HttpClient,
    private spinnerService: SpinnerService
  ) {}

  getPost(offset: number) {
    this.spinnerService.requestStarted();

    let params = new HttpParams().set('offset', offset);

    this.http
      .get<{ image: Image }>(this.url + 'posts', { params: params })
      .pipe(
        map((imageData) => {
          let t = 0;
          imageData.image.thumb = imageData.image.url.replace(/\//g, (match) =>
            ++t === 5 ? '/tr:w-400,h-400,c-at_max/' : match
          );

          return imageData.image;
        })
      )
      .subscribe((image) => {
        this.spinnerService.requestEnded();
        this.image$.next(image);
      });
  }

  getImageStream() {
    return this.image$.asObservable();
  }

  addImage(image: { name: string; image: string }): void {
    console.log(image);
    this.http
      .post<{ image: Image }>(this.url + 'posts', {
        image: image,
      })
      .pipe(
        map((imageData) => {
          let t = 0;
          imageData.image.thumb = imageData.image.url.replace(/\//g, (match) =>
            ++t === 5 ? '/tr:n-media_library_thumbnail/' : match
          );
          return imageData.image;
        })
      )
      .subscribe((image) => {
        this.newImage$.next(image);
      });
  }

  getNewImageStream() {
    return this.newImage$.asObservable();
  }

  private id$ = new Subject<string>(); //observable

  deleteImage(id: string) {
    console.log('deleting image', id);
    this.http
      .post<{ id: string }>(this.url + 'delete', { id: id })
      .subscribe((response) => {
        console.log('image deleted : ', response.id);
        this.id$.next(id);
      });
  }
  getIdStream() {
    return this.id$.asObservable();
  }
}
