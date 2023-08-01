import { Component, OnInit } from '@angular/core';
import { SizeService } from '../services/size/size.service';
import { StatisticComponent } from './statistic/statistic/statistic.component';
import { Statistic } from '../models/Statistic';
import { __values } from 'tslib';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css'],
})
export class StatisticsComponent implements OnInit
{
  public fullSize: number = 0;
  public fullLength: number = 0;

  public statistics: Statistic[] = [
    {
      title: "Total size", // value is to be get by service
      value: null
    }, {
      title: "Total image number", // value is to be get by service
      value: null
    }]


  constructor(private sizeService: SizeService) { }

  ngOnInit(): void
  {
    this.sizeService.getFull_Size_and_Length();
    this.sizeService
      .getFullSize()
      .subscribe((fullSize) => (this.statistics[0].value = (fullSize * 0.00001).toFixed(2) + " mb ")); //from b to mb

    this.sizeService
      .getFullLength()
      .subscribe((fullLength) => (this.statistics[1].value = fullLength));
  }
}
