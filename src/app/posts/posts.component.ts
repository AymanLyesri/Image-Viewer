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
  private limit: number = 60;
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
    console.log(this.offset);
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

  private observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && this.offset < this.limit) {
          this.offset += 15;
          this.imageservice.getPosts(this.offset);
          this.observer.disconnect();
        }
      });
    },
    { rootMargin: '50%' }
  );

  Page(element: HTMLElement, to: boolean) {
    element.scrollIntoView();
    if (to) (this.offset += 15), (this.limit += 60);
    else (this.offset = this.limit - 120), (this.limit -= 60);
    this.imageservice.refresh();
    this.imageservice.getPosts(this.offset);
  }

  showPrevious() {
    return this.limit != 60;
  }

  showNext() {
    return this.offset == this.limit;
  }

  private idSubscribtion: Subscription = this.imageservice
    .getIdStream()
    .subscribe((id: string) => {
      console.log(id);
      this.imgs.forEach((img) => {
        if (img.nativeElement.id == id) {
          this.render.parentNode(img.nativeElement).remove();
        }
      });
    });

  deleteImage(id: string) {
    this.imageservice.deleteImage(id);
  }

  ngOnDestroy(): void {
    this.idSubscribtion.unsubscribe();
    this.imageSubscribtion.unsubscribe();
    this.imgChanges.unsubscribe();
  }
}
