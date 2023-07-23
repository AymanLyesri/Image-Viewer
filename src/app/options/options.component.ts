import { Component, OnInit } from '@angular/core';
import { Option } from '../models/Option';

@Component({
  selector: 'app-options',
  templateUrl: './options.component.html',
  styleUrls: ['./options.component.css'],
})
export class OptionsComponent implements OnInit
{
  public gridOptions: Option = {
    title: 'Grid',
    type: 'grid',
    buttons: [
      { placeholder: 'XL', action: 'xlColumn' },
      { placeholder: 'Large', action: 'largeColumn' },
      { placeholder: 'Med', action: 'mediumColumn' },
      { placeholder: 'Auto', action: 'autoColumn' },
    ],
  };
  public cardHoverOptions: Option = {
    title: 'When Hover',
    type: 'hover',
    buttons: [
      { placeholder: 'Zoom', action: 'zoom' },
      { placeholder: 'Zoom+', action: 'zoomPlus' },
      { placeholder: "none", action: 'noZoom' },
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
      { placeholder: 'On', action: true },
      { placeholder: 'Off', action: false },
    ],
  };


  constructor() { }

  ngOnInit(): void { }
}
