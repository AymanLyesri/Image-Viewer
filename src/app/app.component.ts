import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Meta, Title } from '@angular/platform-browser';
import { VisitesService } from './services/visites/visites.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit
{
  constructor(
    private visitsService: VisitesService,
    private globalTitle: Title,
    private meta: Meta
  ) { }

  favicon: HTMLLinkElement = document.querySelector('#favicon');

  getTitle()
  {
    return environment.NAME;
  }

  ngOnInit(): void
  {
    this.globalTitle.setTitle(environment.TITLE);
    this.meta.addTags([
      { name: 'title', content: environment.TITLE },
      { name: 'description', content: environment.SITEDESCRIPTION },
      { property: 'og:type', content: 'website' },
      { property: 'og:url', content: environment.SITELINK },
      { property: 'og:title', content: environment.TITLE },
      { property: 'og:description', content: environment.SITEDESCRIPTION },
      {
        property: 'og:image',
        content: environment.IMAGEPREVIEWLINK,
      },
      { property: 'twitter:card', content: 'summary_large_image' },
      { property: 'twitter:url', content: environment.SITELINK },
      { property: 'twitter:title', content: environment.TITLE },
      { property: 'twitter:description', content: environment.SITEDESCRIPTION },
      {
        property: 'twitter:image',
        content: environment.IMAGEPREVIEWLINK,
      },
    ]);
    this.favicon.href = environment.FAVICON;
    // this.visitsService.updateVisitors();
  }
}
