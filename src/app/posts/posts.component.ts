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
import { AuthenticationService } from '../services/authentication.service';
import { Subscription } from 'rxjs/internal/Subscription';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css'],
})
export class PostsComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChildren('card') cards: QueryList<ElementRef>;
  @ViewChild('imageGrid') grid: ElementRef<HTMLElement>;

  private offset: number = 0;
  private limit: number = 60;
  public images: Image[] = [];
  private imageSubscription: Subscription;
  private newImageSubscription: Subscription;
  private cardChanges: Subscription;

  private zoomOnHover: string = 'zoom';

  constructor(
    private imageService: ImageService,
    private AuthService: AuthenticationService,
    private render: Renderer2
  ) {}

  ngOnInit(): void {
    this.imageService.getPost(this.offset);
    this.imageSubscription = this.imageService
      .getImageStream()
      .subscribe((image: Image) => {
        this.images.push(image);
      });
    this.newImageSubscription = this.imageService
      .getNewImageStream()
      .subscribe((image: Image) => {
        this.images.unshift(image);
      });

    console.log(this.offset);
  }

  isLoggedIn() {
    return this.AuthService.isLoggedIn();
  }

  toggleGrid(columns: string) {
    this.render.setStyle(
      this.grid.nativeElement,
      'grid-template-columns',
      columns
    );
  }

  mobileToggleGrid(columns: string) {
    this.render.removeClass(this.grid.nativeElement, 'oneColumn');
    this.render.removeClass(this.grid.nativeElement, 'twoColumn');
    this.render.removeClass(this.grid.nativeElement, 'threeColumn');
    this.render.addClass(this.grid.nativeElement, columns);
  }

  toggleHover(zoom: string) {
    console.log(zoom);

    this.zoomOnHover = zoom;
    this.cards.forEach((card) => {
      this.render.removeClass(card.nativeElement, 'zoom');
      this.render.removeClass(card.nativeElement, 'zoomPlus');
      this.render.removeClass(card.nativeElement, 'noZoom');
      this.render.addClass(card.nativeElement, this.zoomOnHover);
    });
  }

  ngAfterViewInit(): void {
    this.cardChanges = this.cards.changes.subscribe(() => {
      this.loadingObserver.observe(this.cards.last.nativeElement);
      this.cards.forEach((card) => {
        this.render.addClass(card.nativeElement, this.zoomOnHover);
      });
    });
  }

  private loadingObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && this.offset < this.limit) {
          this.offset++;
          this.imageService.getPost(this.offset);
          console.log(this.offset, this.limit);

          this.loadingObserver.unobserve(entry.target);
        }
      });
    },
    { rootMargin: '1000px' }
  );

  Page(element: HTMLElement, to: boolean) {
    element.scrollIntoView(false);

    if (to) this.offset++, (this.limit += 60);
    else (this.offset = this.limit - 120), (this.limit -= 60);

    console.log(this.offset, this.limit);

    setTimeout(() => {
      this.images.length = 0;
      this.imageService.getPost(this.offset);
    }, 1500);
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
      this.cards.forEach((card) => {
        if (card.nativeElement.id == id) {
          this.render.parentNode(card.nativeElement).remove();
        }
      });
    });

  deleteImage(id: string) {
    this.imageService.deleteImage(id);
  }

  ngOnDestroy(): void {
    // this.idSubscription.unsubscribe();
    this.imageSubscription.unsubscribe();
    this.cardChanges.unsubscribe();
  }
}
