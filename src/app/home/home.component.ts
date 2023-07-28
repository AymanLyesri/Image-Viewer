import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';
import { VisitesService } from '../services/visites/visites.service';
import { get } from 'scriptjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit
{
  public visitors: number;
  public title: string;

  constructor(
    private visitsService: VisitesService,
    private globalTitle: Title,
    private meta: Meta
  ) { }

  ngOnInit(): void
  {
    this.title = environment.TITLE;
    this.meta.addTags([
      { name: 'title', content: environment.TITLE },
      { name: 'description', content: environment.SITEDESCRIPTION },
    ]);

    get("https://counterapi.com/c.js", () =>
    {
      //Google Maps library has been loaded...
    });


    // this.visitsService
    //   .getVisitors()
    //   .subscribe((visits) => (this.visitors = visits));
  }

}
