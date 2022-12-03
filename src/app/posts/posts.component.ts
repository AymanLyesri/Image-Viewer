import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  QueryList,
  Renderer2,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { ImageService } from '../services/image.service';
import { Image } from '../models/Image';
import { Subscription, timeout } from 'rxjs';
import { AuthentificationService } from '../services/authentification.service';
import { CursorDirective } from '../directives/cursor/cursor.directive';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css'],
})
export class PostsComponent implements OnInit, OnDestroy, AfterViewInit {
  public images: Image[] = [];
  private imageSubscribtion: Subscription;

  constructor(
    private imageservice: ImageService,
    private render: Renderer2,
    private AuthService: AuthentificationService
  ) {}

  ngOnInit(): void {
    this.imageservice.getPosts();
    this.imageSubscribtion = this.imageservice
      .getImagesStream()
      .subscribe((images: Image[]) => {
        this.images = images;
      });
  }

  isLoggedIn() {
    return this.AuthService.isLoggedIn();
  }

  ngAfterViewInit(): void {}

  // private idSubscribtion: Subscription;

  // deleteImage(id: string) {
  //   this.imageservice.deleteImage(id);

  //   this.idSubscribtion = this.imageservice.getId().subscribe((id: string) => {
  //     console.log(id);
  //     this.imgs.forEach((img) => {
  //       if (img.nativeElement.id == id) {
  //         console.log('lol img');

  //         let parent = this.render.parentNode(img.nativeElement);

  //         parent.remove();
  //       }
  //     });
  //   });
  // }

  ngOnDestroy(): void {
    this.imageSubscribtion.unsubscribe();
  }
}
