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

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css'],
})
export class PostsComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChildren('img') imgs: QueryList<ElementRef>;
  @ViewChildren('hidden') hiddens: QueryList<ElementRef>;
  observer: IntersectionObserver;

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

  ngAfterViewInit(): void {
    this.hideAndShow();
    this.processChildren();

    this.imgs.changes.subscribe(() => {
      this.processChildren();
    });

    this.hiddens.changes.subscribe(() => {
      this.hiddens.forEach((hidden) => {
        this.observer.observe(hidden.nativeElement);
      });
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

  private hideAndShow(): void {
    let options = {
      root: null as Element,
      rootMargin: '0px',
      threshold: 0.1,
    };

    this.observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('show');
        } else {
          entry.target.classList.remove('show');
        }
      });
    }, options);
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
