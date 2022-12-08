import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  @ViewChild('window:scroll') scroll: ElementRef;

  constructor() {}

  ngOnInit(): void {}

  getTitle() {
    return environment.NAME;
  }
}
