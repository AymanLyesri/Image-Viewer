import
{
  Component,
  ElementRef,
  Input,
  OnInit,
  AfterViewInit,
  QueryList,
  ViewChildren,
  Host,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { environment } from 'src/environments/environment';
import { Image } from 'src/app/models/Image';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { RefreshFavoritesService } from 'src/app/services/refresh-favorites/refresh-favorites.service';
import { ImageRatioDirective } from 'src/app/directives/image-ratio/image-ratio.directive';
import { ImageHoverDirective } from 'src/app/directives/image-hover/image-hover.directive';
import { TooltipModule } from 'ng2-tooltip-directive';
import { ImageService } from 'src/app/services/image.service';

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [CommonModule, ImageRatioDirective, ImageHoverDirective, TooltipModule],
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css'],
})
export class PostComponent implements OnInit
{
  @ViewChildren('card') cards: QueryList<ElementRef>;
  @Input() image: Image;
  @Input() METHOD: string;

  public imgAlt = environment.TITLE + ' ';
  public favorites: Image[];
  public images: Image[] = [];
  public logged: boolean;

  public showPrevious: boolean = false;
  public showNext: boolean = false;

  constructor(
    private imageService: ImageService,
    private AuthService: AuthenticationService,
    private refreshService: RefreshFavoritesService,
  )
  {
  }

  ngOnInit(): void
  {
    this.isLoggedIn();


  }



  isLoggedIn()
  {
    return this.AuthService.isLoggedIn();
  }

  // deleteImage(id: string)
  // {
  //   this.postsComponent.deleteImage(id);
  // }

  deleteFavorite(image: Image)
  {
    this.imageService.deleteFavorite(image)
  }

  addFavorite(image: Image)
  {
    this.imageService.addFavorite(image)
  }
}
