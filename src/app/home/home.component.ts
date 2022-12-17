import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { VisitesService } from '../services/visites/visites.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  public visitors: number;
  public title: string;

  constructor(private visitsService: VisitesService) {}

  ngOnInit(): void {
    this.getTitle();
    this.visitsService.updateVisitors();
    this.visitsService
      .getVisitors()
      .subscribe((visits) => (this.visitors = visits));
  }

  getTitle() {
    this.title = environment.NAME;
  }
}
