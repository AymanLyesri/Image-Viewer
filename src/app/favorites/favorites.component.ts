import {
  Component,
  ElementRef,
  OnInit,
  QueryList,
  Renderer2,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { Image } from '../models/Image';
import { Subscription } from 'rxjs/internal/Subscription';
import { ImageService } from '../services/image.service';
import { OptionsService } from '../services/options/options.service';
import { RefreshFavoritesService } from '../services/refresh-favorites/refresh-favorites.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css'],
})
export class FavoritesComponent implements OnInit {
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

  private refreshSubscription: Subscription;
  private imageSubscription: Subscription;
  private newImageSubscription: Subscription;
  private cardChanges: Subscription;

  constructor(
    private imageService: ImageService,
    private render: Renderer2,
    private options: OptionsService,
    private refreshService: RefreshFavoritesService
  ) {}

  ngOnInit(): void {
    this.favorites = JSON.parse(localStorage.getItem('favorites'));

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

    this.imageService.getFavorite(this.favorites[this.offset]);

    this.imageSubscription = this.imageService
      .getFavoriteStream()
      .subscribe((image: Image) => {
        this.images.push(image);
      });

    this.refreshSubscription = this.refreshService.refresh().subscribe(() => {
      this.favorites = JSON.parse(localStorage.getItem('favorites'));
      console.log(this.favorites);
      this.imageService.getFavorite(this.favorites[this.favorites.length - 1]);
    });
  }

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
        if (entry.isIntersecting && this.offset < this.favorites.length) {
          for (
            let index = 0;
            index < this.loadingSpeed && this.offset < this.limit;
            index++
          ) {
            this.offset++;
            this.imageService.getFavorite(this.favorites[this.offset]);
            console.log(this.offset, this.limit);
          }

          this.loadingObserver.unobserve(entry.target);
        }
      });
    },
    { rootMargin: '1000px' }
  );

  deleteFavorite(id: string) {
    if (this.favorites.indexOf(id) < 0) return;

    this.favorites = JSON.parse(localStorage.getItem('favorites'));
    this.favorites.splice(this.favorites.indexOf(id), 1);

    this.cards.forEach((card) => {
      if (card.nativeElement.id == id) card.nativeElement.remove();
    });

    console.log(this.favorites);
    localStorage.setItem('favorites', JSON.stringify(this.favorites));
  }
}
