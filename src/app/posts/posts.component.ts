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
    private AuthService: AuthentificationService,
    private render: Renderer2
  ) {}

  ngOnInit(): void {
    this.imageservice.getPosts(this.offset);
    this.imageSubscribtion = this.imageservice
      .getImagesStream()
      .subscribe((images: Image[]) => {
        this.images = images;
      });
  }

  getSize(data: string) {
    return new TextEncoder().encode(data).length * 0.001;
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
      console.log('not the same');

      this.offset += 10;

      this.imageservice.getPosts(this.offset);
      this.imageSubscribtion = this.imageservice
        .getImagesStream()
        .subscribe((images: Image[]) => {
          this.images = images;
        });

      this.oldLastImg = (entries[0].target as any).toString(); //for not repeating
    } else {
      console.log('same');
    }
  });

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
