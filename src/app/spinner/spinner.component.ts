import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { SpinnerService } from '../services/spinner/spinner.service';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.css'],
})
export class SpinnerComponent implements OnInit {
  showSpinner = false;

  constructor(private spinnerService: SpinnerService) {}

  ngOnInit(): void {
    this.init();
  }

  init() {
    this.spinnerService.getSpinnerObserver().subscribe((status) => {
      this.showSpinner = status === 'start';
    });
  }

  getUrl() {
    return "background-image:url('" + environment.FAVICON + "');";
  }
}
