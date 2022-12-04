import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  QueryList,
  Renderer2,
  ViewChildren,
} from '@angular/core';
import { ImageService } from '../services/image.service';
import { Image } from '../models/Image';
import { Subscription } from 'rxjs';
import { AuthentificationService } from '../services/authentification.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css'],
})
export class PostsComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChildren('img') imgs: QueryList<ElementRef>;

  private offset: number = 0;
  public images: Image[] = [];
  private imageSubscribtion: Subscription;

  constructor(
    private imageservice: ImageService,
    private render: Renderer2,
    private AuthService: AuthentificationService
  ) {}

  ngOnInit(): void {
    this.imageservice.getPosts(this.offset);
    this.imageSubscribtion = this.imageservice
      .getImagesStream()
      .subscribe((images: Image[]) => {
        this.images = images;
      });
  }

  isLoggedIn() {
    return this.AuthService.isLoggedIn();
  }

  oldLastImg: string;

  ngAfterViewInit(): void {
    this.imgs.changes.subscribe(() => {
      this.observer.observe(this.imgs.last.nativeElement);
    });
  }

  private observer = new IntersectionObserver((entries) => {
    if (
      entries[0].isIntersecting &&
      (entries[0].target as any) != this.oldLastImg
    ) {
      this.offset += 10;

      this.imageservice.getPosts(this.offset);
      this.imageSubscribtion = this.imageservice
        .getImagesStream()
        .subscribe((images: Image[]) => {
          this.images = images;
        });

      this.oldLastImg = entries[0].target as any; //for not repeating
    }
  });

  ngOnDestroy(): void {
    this.imageSubscribtion.unsubscribe();
  }
}
