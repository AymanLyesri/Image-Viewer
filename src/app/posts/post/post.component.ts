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
import { Observable, Observer } from 'rxjs';

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

  private base64Image: any;

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

  downloadImage()
  {
    let imageUrl = this.image.url;

    this.getBase64ImageFromURL(imageUrl).subscribe((base64data: string) =>
    {
      console.log(base64data);
      this.base64Image = "data:image/jpg;base64," + base64data;
      // save image to disk
      var link = document.createElement("a");

      document.body.appendChild(link); // for Firefox

      link.setAttribute("href", this.base64Image);
      link.setAttribute("download", this.image.name);
      link.click();
    });
  }

  getBase64ImageFromURL(url: string)
  {
    return new Observable((observer: Observer<string>) =>
    {
      const img: HTMLImageElement = new Image();
      img.crossOrigin = "Anonymous";
      img.src = url;
      if (!img.complete) {
        img.onload = () =>
        {
          observer.next(this.getBase64Image(img));
          observer.complete();
        };
        img.onerror = err =>
        {
          observer.error(err);
        };
      } else {
        observer.next(this.getBase64Image(img));
        observer.complete();
      }
    });
  }

  getBase64Image(img: HTMLImageElement)
  {
    const canvas: HTMLCanvasElement = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;
    const ctx: CanvasRenderingContext2D = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0);
    const dataURL: string = canvas.toDataURL("image/png");

    return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
  }

  isLoggedIn()
  {
    return this.AuthService.isLoggedIn();
  }

  deleteFavorite(image: Image)
  {
    this.imageService.deleteFavorite(image)
  }

  addFavorite(image: Image)
  {
    this.imageService.addFavorite(image)
  }
}
