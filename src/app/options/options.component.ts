import { Component, OnInit } from '@angular/core';
import { Option } from '../models/Option';

@Component({
  selector: 'app-options',
  templateUrl: './options.component.html',
  styleUrls: ['./options.component.css'],
})
export class OptionsComponent implements OnInit {
  public gridOptions: Option = {
    title: 'Grid',
    type: 'grid',
    buttons: [
      { placeholder: 'Large', action: 'repeat(4, minmax(0, 1fr))' },
      { placeholder: 'Medium', action: 'repeat(6, minmax(0, 1fr))' },
      { placeholder: 'Auto', action: 'repeat(auto-fill, minmax(200px, 1fr))' },
    ],
  };
  public cardHoverOptions: Option = {
    title: 'When Hover',
    type: 'hover',
    buttons: [
      { placeholder: 'Zoom', action: 'zoom' },
      { placeholder: 'Zoom Plus', action: 'zoomPlus' },
      { placeholder: 'No Zoom', action: 'noZoom' },
    ],
  };
  public loadingSpeedsOptions: Option = {
    title: 'Loading Speed',
    type: 'loadingSpeed',
    buttons: [
      { placeholder: 'Medium', action: '1' },
      { placeholder: 'Fast', action: '2' },
      { placeholder: 'Beta*', action: '3' },
    ],
  };
  public spanOptions: Option = {
    title: 'Span',
    type: 'span',
    buttons: [
      { placeholder: 'On', action: 'true' },
      { placeholder: 'Off', action: 'false' },
    ],
  };
  //mobile Options
  public mobileGridOptions: Option = {
    title: 'Grid',
    type: 'mobileGrid',
    buttons: [
      { placeholder: 'Large', action: 'oneColumn' },
      { placeholder: 'Small', action: 'twoColumn' },
      { placeholder: 'Auto', action: 'threeColumn' },
    ],
  };

  constructor() {}

  ngOnInit(): void {}
}
