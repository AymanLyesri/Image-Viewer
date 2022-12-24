import { Component, OnInit } from '@angular/core';
import { OptionsService } from '../services/options/options.service';

@Component({
  selector: 'app-options',
  templateUrl: './options.component.html',
  styleUrls: ['./options.component.css'],
})
export class OptionsComponent implements OnInit {
  public loadingSpeed: number = 2;
  public gridClass: string = 'auto';
  public gridClassMobile: string = 'oneColumn';
  public cardHoverClass: string = 'zoom';
  public spanState: boolean = false;

  constructor(private options: OptionsService) {}

  ngOnInit(): void {}

  toggleGrid(columns: string, abbreviation: string) {
    this.gridClass = abbreviation;
    this.options.updateGridClass(columns);
  }

  mobileToggleGrid(columns: string) {
    this.gridClassMobile = columns;
    this.options.updateGridClassMobile(columns);
  }

  toggleHover(zoom: string) {
    this.cardHoverClass = zoom;
    this.options.updateCardHoverClass(zoom);
  }

  toggleLoadingSpeed(speed: number) {
    this.loadingSpeed = speed;
    this.options.updateLoadingSpeed(speed);
  }
  toggleSpan(state: boolean) {
    this.spanState = state;
    this.options.updateSpanState(state);
  }
}
