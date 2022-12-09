import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { VisitesService } from '../services/visites/visites.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  visitors: number;

  constructor(private visitsService: VisitesService) {}

  ngOnInit(): void {}

  getTitle() {
    return environment.NAME;
  }

  getVisits() {
    return this.visitsService.getVisitors();
  }
}
