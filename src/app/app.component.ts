import { style } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor() {}

  favicon: HTMLLinkElement = document.querySelector('#favicon');

  getTitle() {
    return environment.NAME;
  }

  ngOnInit(): void {
    this.favicon.href = environment.FAVICON;
  }
}
