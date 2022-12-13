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
import { AuthenticationService } from '../services/authentication.service';
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
  private imagesSubscription: Subscription;
  private imgChanges: Subscription;

  constructor(
    private imageService: ImageService,
    private AuthService: AuthenticationService,
    private render: Renderer2
  ) {}

  ngOnInit(): void {
    this.imageService.getPosts(this.offset);
    this.imagesSubscription = this.imageService
      .getImagesStream()
      .subscribe((images: Image[]) => {
        this.images = images;
        console.log(images[0].url);
      });
    console.log(this.offset);
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
          this.imageService.getPosts(this.offset);
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
    this.imageService.refresh();
    this.imageService.getPosts(this.offset);
  }

  showPrevious() {
    return this.limit != 60;
  }

  showNext() {
    return this.offset == this.limit;
  }

  private idSubscription: Subscription = this.imageService
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
    this.imageService.deleteImage(id);
  }

  ngOnDestroy(): void {
    this.idSubscription.unsubscribe();
    this.imagesSubscription.unsubscribe();
    this.imgChanges.unsubscribe();
  }
}
