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
import { OptionsService } from '../services/options/options.service';
import { RefreshFavoritesService } from '../services/refresh-favorites/refresh-favorites.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css'],
})
export class PostsComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChildren('card') cards: QueryList<ElementRef>;
  @ViewChild('imageGrid') grid: ElementRef<HTMLElement>;

  public favorites: string[];
  public images: Image[] = [];
  public logged: boolean;

  private oldColumns: string = 'oneColumn';
  private oldZoom: string = 'zoom';
  private loadingSpeed: number = 2;
  private offset: number = 0;
  private limit: number = 60;

  private imageSubscription: Subscription;
  private newImageSubscription: Subscription;
  private cardChanges: Subscription;

  constructor(
    private imageService: ImageService,
    private AuthService: AuthenticationService,
    private render: Renderer2,
    private options: OptionsService,
    private refreshService: RefreshFavoritesService
  ) {}

  ngOnInit(): void {
    this.isLoggedIn();

    this.options.getLoadingSpeed().subscribe((speed) => {
      this.loadingSpeed = speed;
    });
    this.options.getGridClass().subscribe((columns) => {
      this.toggleGrid(columns);
    });
    this.options.getGridClassMobile().subscribe((columns) => {
      this.mobileToggleGrid(columns, this.oldColumns);
    });
    this.options.getCardHoverClass().subscribe((zoom) => {
      this.toggleHover(zoom, this.oldZoom);
    });

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
  }

  // downloadImage(url: string, imageName: string) {
  //   this.imageService
  //     .downloadImage(url)
  //     .subscribe((response: Blob | MediaSource) => {
  //       console.log(response, imageName);
  //       var a = document.createElement('a');
  //       a.download = imageName;
  //       a.href = window.URL.createObjectURL(response);
  //       a.click;
  //     });
  // }

  toggleGrid(columns: string) {
    this.render.setStyle(
      this.grid.nativeElement,
      'grid-template-columns',
      columns
    );
  }

  mobileToggleGrid(columns: string, oldColumns: string) {
    this.render.removeClass(this.grid.nativeElement, oldColumns);
    this.render.addClass(this.grid.nativeElement, columns);
    this.oldColumns = columns;
  }

  toggleHover(zoom: string, oldZoom: string) {
    this.cards.forEach((card) => {
      this.render.removeClass(card.nativeElement, oldZoom);
      this.render.addClass(card.nativeElement, zoom);
    });
    this.oldZoom = zoom;
  }

  isLoggedIn() {
    return this.AuthService.isLoggedIn();
  }

  ngAfterViewInit(): void {
    this.cardChanges = this.cards.changes.subscribe(() => {
      if (this.images.length > 0)
        this.loadingObserver.observe(this.cards.last.nativeElement);
      this.cards.forEach((card) => {
        this.render.addClass(card.nativeElement, this.oldZoom);
      });
    });
  }

  private loadingObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && this.offset < this.limit) {
          for (
            let index = 0;
            index < this.loadingSpeed && this.offset < this.limit;
            index++
          ) {
            this.offset++;
            this.imageService.getPost(this.offset);
            console.log(this.offset, this.limit);
          }

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

    setTimeout(() => {
      this.images.length = 0;
      this.imageService.getPost(this.offset);
    }, 700);
  }

  showPrevious() {
    return this.limit != 60;
  }

  showNext() {
    return this.offset == this.limit;
  }

  deleteImage(id: string) {
    this.imageService.deleteImage(id).subscribe((response) => {
      console.log(response.id);
      this.cards.forEach((card) => {
        if (card.nativeElement.id == response.id) {
          card.nativeElement.remove();
        }
      });
    });
  }

  addFavorite(id: string) {
    console.log(id);

    this.favorites = JSON.parse(localStorage.getItem('favorites'))
      ? JSON.parse(localStorage.getItem('favorites'))
      : [];

    if (this.favorites.indexOf(id) > 0) return;

    this.favorites.push(id);
    console.log(this.favorites);
    localStorage.setItem('favorites', JSON.stringify(this.favorites));
    this.refreshService.setRefreshRequest();
  }

  ngOnDestroy(): void {
    this.imageSubscription.unsubscribe();
    this.cardChanges.unsubscribe();
    this.newImageSubscription.unsubscribe();
  }
}
