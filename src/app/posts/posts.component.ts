import {
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
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css'],
})
export class PostsComponent implements OnInit, OnDestroy {
  @ViewChildren('card') cards: QueryList<ElementRef>;
  @ViewChild('imageGrid') grid: ElementRef<HTMLElement>;

  public favorites: string[];
  public images: Image[] = [];
  public logged: boolean;

  private oldColumns: string = 'oneColumn';

  private loadingSpeed: number = 2;

  private offset: number = 0;
  private limit: number = 60;

  public showPrevious: boolean = false;
  public showNext: boolean = false;

  private imageSubscription: Subscription;
  private newImageSubscription: Subscription;
  private cardChanges: Subscription;

  public imgAlt = environment.TITLE + ' ';

  constructor(
    private imageService: ImageService,
    private AuthService: AuthenticationService,
    private render: Renderer2,
    private options: OptionsService
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
    // this.options.getCardHoverClass().subscribe((zoom) => {
    //   this.toggleHover(zoom, this.oldZoom);
    // });

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

  isLoggedIn() {
    return this.AuthService.isLoggedIn();
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

          this.showPrevious = this.limit != 60 ? true : false;
          this.showNext = this.offset == this.limit ? true : false;
        }
      });
    },
    { rootMargin: '500px' }
  );

  ngAfterViewInit(): void {
    this.cardChanges = this.cards.changes.subscribe(() => {
      if (this.images.length > 0)
        this.loadingObserver.observe(this.cards.last.nativeElement);
      // this.cards.forEach((card) => {
      //   this.render.addClass(card.nativeElement, this.oldZoom);
      // });
    });
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

  Page(element: HTMLElement, to: boolean) {
    element.scrollIntoView(false);

    setTimeout(() => {
      if (to) this.offset++, (this.limit += 60);
      else (this.offset = this.limit - 120), (this.limit -= 60);
      this.images.length = 0;
      this.imageService.getPost(this.offset);
    }, 700);
  }

  ngOnDestroy(): void {
    this.imageSubscription.unsubscribe();
    this.cardChanges.unsubscribe();
    this.newImageSubscription.unsubscribe();
  }
}
