import
{
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { ImageService } from '../services/image.service';
import { Image } from '../models/Image';
import { AuthenticationService } from '../services/authentication.service';
import { Subscription } from 'rxjs/internal/Subscription';
import { environment } from 'src/environments/environment';
import { OptionsService } from '../services/options/options.service';
import { ActivatedRoute } from '@angular/router';
import { map, takeWhile, timer } from 'rxjs';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css'],
})
export class PostsComponent implements OnInit, OnDestroy
{
  @ViewChildren('posts') posts: QueryList<ElementRef>;
  @ViewChild('imageGrid') grid: ElementRef<HTMLElement>;

  public METHOD = "posts" || "favorites";

  public favorites: string[];
  public images: Image[] = [];
  public logged: boolean;

  private loadingSpeed: number = 2;

  private offset: number = 0;
  private limit: number = 60;

  public showPrevious: boolean = false;
  public showNext: boolean = false;

  private imageSubscription: Subscription;
  private newImageSubscription: Subscription;
  private postsChanges: Subscription;

  private loadingObserver;

  public imgAlt = environment.TITLE + ' ';

  public secondsRemaining: number;
  public secondsRemaining$ = timer(0, 1000).pipe(
    map(n => 30 - n),
    takeWhile(n => n >= 0),
  );

  constructor(
    private imageService: ImageService,
    private AuthService: AuthenticationService,
    private activatedRoute: ActivatedRoute,
    private optionsService: OptionsService
  )
  {
    this.METHOD = this.activatedRoute.snapshot.firstChild?.paramMap.get('method') || "posts"

    this.loadingObserver = new IntersectionObserver(
      (entries) =>
      {
        entries.forEach((entry) =>
        {
          if (entry.isIntersecting && this.offset < this.limit) {
            for (
              let index = 0;
              index < this.loadingSpeed && this.offset < this.limit;
              index++
            ) {
              this.offset++;
              this.imageService.getPost(this.offset);
            }
            this.loadingObserver.unobserve(entry.target);


            this.showPrevious = this.limit != 60 ? true : false;
            this.showNext = this.offset == this.limit ? true : false;
          }
        });
      },
      { rootMargin: '1000px' }
    );

    this.secondsRemaining$.subscribe((second) =>
    {
      this.secondsRemaining = second
    })

  }

  ngOnInit(): void
  {

    // console.log(this.activatedRoute.snapshot.firstChild.paramMap.get('method'));
    this.isLoggedIn();

    this.optionsService.getLoadingSpeed$.subscribe((speed) =>
    {
      this.loadingSpeed = speed;
    });

    if (this.METHOD === "posts") {
      this.imageSubscription = this.imageService
        .getImageStream()
        .subscribe((image: Image) =>
        {
          this.images.push(image);

        });

      this.newImageSubscription = this.imageService
        .getNewImageStream()
        .subscribe((image: Image) =>
        {
          this.images.unshift(image);
        });
    }
    else if (this.METHOD === "favorites") {
      if (JSON.parse(localStorage.getItem('favorites')) != null)
        this.images = JSON.parse(localStorage.getItem('favorites'));

      this.imageSubscription = this.imageService
        .getFavoriteStream()
        .subscribe((image: Image) =>
        {
          this.images.push(image);
        });

      this.imageService.deleteFavIndex$.subscribe((index) => this.images.splice(index, 1))
    }
  }

  isLoggedIn()
  {
    return this.AuthService.isLoggedIn();
  }

  ngAfterViewInit(): void
  {
    this.postsChanges = this.posts.changes.subscribe(() =>
    {

      this.loadingObserver.observe(this.posts.last.nativeElement);
    });

    if (this.METHOD == "posts") this.imageService.getPost(this.offset); //needs to be after

  }

  deleteFavorite(id: string)
  {

    let favorites = JSON.parse(localStorage.getItem('favorites'));
    favorites.splice(this.favorites.indexOf(id), 1);


    localStorage.setItem('favorites', JSON.stringify(favorites));
  }


  deleteImage(id: string)
  {
    this.imageService.deleteImage(id).subscribe((response) =>
    {
      console.log(response.id);
      this.posts.forEach((card) =>
      {
        if (card.nativeElement.id == response.id) {
          card.nativeElement.remove();
        }
      });
    });
  }

  Page(element: HTMLElement, to: boolean) //to right/left
  {
    element.scrollIntoView(false);

    setTimeout(() =>
    {
      if (to) this.offset++, (this.limit += 60);
      else (this.offset = this.limit - 120), (this.limit -= 60);
      this.images.length = 0;
      this.imageService.getPost(this.offset);
    }, 700);
  }

  ngOnDestroy(): void
  {
    this.imageSubscription.unsubscribe();
    this.postsChanges.unsubscribe();
    this.newImageSubscription?.unsubscribe();
  }
}
