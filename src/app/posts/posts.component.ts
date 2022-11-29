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

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css'],
})
export class PostsComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChildren('img') imgs: QueryList<ElementRef>;

  public images: Image[] = [];
  private imageSubscribtion: Subscription;

  constructor(private imageservice: ImageService, private render: Renderer2) {}

  ngOnInit(): void {
    console.log('init');
    this.imageservice.getPosts();
    this.imageSubscribtion = this.imageservice
      .getImagesStream()
      .subscribe((images: Image[]) => {
        this.images = images;
        console.log('client side 1  : ', this.images);
      });
  }

  ngAfterViewInit(): void {
    this.processChildren();
    this.imgs.changes.subscribe(() => {
      this.processChildren();
    });
  }

  private processChildren(): void {
    this.imgs.forEach((img) => {
      img.nativeElement.onload = () => {
        var realWidth = img.nativeElement.naturalWidth;
        var realHeight = img.nativeElement.naturalHeight;

        if (realWidth / realHeight >= 1.4) {
          this.render.addClass(img.nativeElement.parentElement, 'image-wide');
        } else if (realWidth / realHeight <= 0.6) {
          this.render.addClass(img.nativeElement.parentElement, 'image-tall');
        }
      };
    });
  }

  private idSubscribtion: Subscription;

  deleteImage(id: string) {
    this.imageservice.deleteImage(id);

    this.idSubscribtion = this.imageservice.getId().subscribe((id: string) => {
      console.log(id);
      this.imgs.forEach((img) => {
        if (img.nativeElement.id == id) {
          console.log('lol img');

          let parent = this.render.parentNode(img.nativeElement);

          parent.remove();
        }
      });
    });
  }

  ngOnDestroy(): void {
    this.imageSubscribtion.unsubscribe();
  }
}
