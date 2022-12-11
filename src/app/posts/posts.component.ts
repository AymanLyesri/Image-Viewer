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
import { AuthentificationService } from '../services/authentification.service';
import { Subscription } from 'rxjs/internal/Subscription';

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
  private imgChanges: Subscription;

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
        console.log(images[0].url);
      });
  }

  getSize(data: string) {
    return new TextEncoder().encode(data).length * 0.001;
  }

  isLoggedIn() {
    return this.AuthService.isLoggedIn();
  }

  ngAfterViewInit(): void {
    this.imgChanges = this.imgs.changes.subscribe(() => {
      this.observer.observe(this.imgs.last.nativeElement);
    });
  }

  private observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        this.offset += 20;

        this.imageservice.getPosts(this.offset);
        this.imageservice.getImagesStream().subscribe((images: Image[]) => {
          if (this.images == images) {
            return;
          } else {
            this.images = images;
          }
        });

        entries.forEach((entry) => {
          this.observer.unobserve(entry.target);
        });
      }
    });
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
          this.idSubscribtion.unsubscribe();
        }
      });
    });
  }

  ngOnDestroy(): void {
    this.imageSubscribtion.unsubscribe();
    this.imgChanges.unsubscribe();
  }
}
