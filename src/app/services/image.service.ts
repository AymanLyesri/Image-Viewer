import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Image } from '../models/Image';

@Injectable({
  providedIn: 'root',
})
export class ImageService {
  private images: Image[] = [];
  private images$ = new Subject<Image[]>(); //observable
  readonly url = 'https://image-viewer-api-production.up.railway.app/api/';

  constructor(private http: HttpClient) {}

  getPosts() {
    return this.http
      .get<{ images: Image[] }>(this.url + 'posts')
      .pipe(
        map((imageData) => {
          return imageData.images;
        })
      )
      .subscribe((images) => {
        this.images = images;
        this.images$.next(this.images);
      });
  }

  getImagesStream() {
    return this.images$.asObservable();
  }

  addImages(name: string, images: FileList): void {
    var imageData = new FormData();
    imageData.append('name', name);

    for (let i = 0; i < images.length; i++) {
      imageData.append('images', images[i]);
    }

    this.http
      .post<{ image: Image[] }>(this.url + 'posts', imageData)
      .subscribe((imageData) => {
        this.images = this.images.concat(imageData.image);
        this.images$.next(this.images);
      });
  }

  private id: string;
  private id$ = new Subject<string>(); //observable

  deleteImage(id: string) {
    console.log('deleting image', id);

    this.http.post<any>(this.url + 'delete', { id: id }).subscribe((id) => {
      console.log('image deleted : ', id.id);
      this.id = id.id;
      this.id$.next(this.id);
    });
  }

  getId() {
    console.log(this.id$);

    return this.id$.asObservable();
  }
}
