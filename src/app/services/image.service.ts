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
  private images: Image[] = [];
  private images$ = new Subject<Image[]>(); //observable
  readonly url = environment.URL + '/api/';

  constructor(
    private http: HttpClient,
    private spinnerService: SpinnerService
  ) {}

  getPosts(offset: number) {
    this.spinnerService.requestStarted();

    let params = new HttpParams().set('offset', offset);

    return this.http
      .get<{ images: Image[] }>(this.url + 'posts', { params: params })
      .pipe(
        map((imageData) => {
          return imageData.images;
        })
      )
      .subscribe((images) => {
        this.spinnerService.requestEnded();

        if (images) {
          this.images = this.images.concat(images);
          this.images$.next(this.images);
        }
      });
  }

  refresh() {
    this.images.splice(0);
  }

  getImagesStream() {
    return this.images$.asObservable();
  }

  addImage(image: { name: string; image: string }): void {
    console.log(image);

    this.http
      .post<{ image: Image }>(this.url + 'posts', {
        image: image,
      })
      .subscribe(
        (imageData) => {
          console.log('data:', imageData);

          this.images.unshift(imageData.image);
          this.images$.next(this.images);
        },
        (error: { message: string }) => {
          console.log(error.message);
          window.alert(error.message);
        }
      );
  }

  private id: string;
  private id$ = new Subject<string>(); //observable

  deleteImage(id: string) {
    console.log('deleting image', id);

    this.http
      .post<{ id: string }>(this.url + 'delete', { id: id })
      .subscribe((response) => {
        console.log('image deleted : ', response.id);
        this.id = response.id;
        this.id$.next(this.id);
      });
  }

  getIdStream() {
    return this.id$.asObservable();
  }
}
