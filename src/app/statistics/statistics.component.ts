import { Component, OnInit } from '@angular/core';
import { SizeService } from '../services/size/size.service';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css'],
})
export class StatisticsComponent implements OnInit {
  public fullSize: number = 0;
  public fullLength: number = 0;

  constructor(private sizeService: SizeService) {}

  ngOnInit(): void {
    this.sizeService.getFull_Size_and_Length();
    this.sizeService
      .getFullSize()
      .subscribe((fullSize) => (this.fullSize = fullSize));

    this.sizeService
      .getFullLength()
      .subscribe((fullLength) => (this.fullLength = fullLength));
  }
}
