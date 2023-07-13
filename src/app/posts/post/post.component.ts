import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnInit,
  QueryList,
  Renderer2,
  ViewChildren,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { environment } from 'src/environments/environment';
import { Image } from 'src/app/models/Image';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { RefreshFavoritesService } from 'src/app/services/refresh-favorites/refresh-favorites.service';
import { ImageService } from 'src/app/services/image.service';
import { Subscription } from 'rxjs';
import { PostsComponent } from '../posts.component';

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css'],
})
export class PostComponent implements OnInit {
  @ViewChildren('card') cards: QueryList<ElementRef>;
  @Input() image: Image;
  @Input() postsComponent: PostsComponent;

  public imgAlt = environment.TITLE + ' ';
  public favorites: string[];
  public images: Image[] = [];
  public logged: boolean;

  private oldZoom: string = 'zoom';

  public showPrevious: boolean = false;
  public showNext: boolean = false;

  private imageSubscription: Subscription;
  private newImageSubscription: Subscription;
  private cardChanges: Subscription;

  constructor(
    private AuthService: AuthenticationService,
    private refreshService: RefreshFavoritesService,
    private imageService: ImageService,
    private render: Renderer2
  ) {}

  toggleHover(zoom: string, oldZoom: string) {
    this.cards.forEach((card) => {
      this.render.removeClass(card.nativeElement, oldZoom);
      this.render.addClass(card.nativeElement, zoom);
    });
    this.oldZoom = zoom;
  }

  ngOnInit(): void {
    this.isLoggedIn();
  }

  isLoggedIn() {
    return this.AuthService.isLoggedIn();
  }

  deleteImage(id: string) {
    this.postsComponent.deleteImage(id);
  }

  addFavorite(id: string) {
    console.log(id);

    this.favorites = JSON.parse(localStorage.getItem('favorites'))
      ? JSON.parse(localStorage.getItem('favorites'))
      : [];

    if (this.favorites.indexOf(id) >= 0) return;

    this.favorites.push(id);
    console.log(this.favorites);
    localStorage.setItem('favorites', JSON.stringify(this.favorites));
    this.refreshService.setRefreshRequest();
  }
}
