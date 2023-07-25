import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Statistic } from 'src/app/models/Statistic';

@Component({
  selector: 'app-statistic',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './statistic.component.html',
  styleUrls: ['./statistic.component.css']
})
export class StatisticComponent implements OnInit
{

  @Input() statistic: Statistic;

  constructor() { }

  ngOnInit(): void
  {
  }

}
