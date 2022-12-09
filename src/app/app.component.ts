import { style } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { VisitesService } from './services/visites/visites.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor(private visitsService: VisitesService) {}

  favicon: HTMLLinkElement = document.querySelector('#favicon');

  getTitle() {
    return environment.NAME;
  }

  ngOnInit(): void {
    this.favicon.href = environment.FAVICON;
    this.visitsService.updateVisitors();
  }
}
