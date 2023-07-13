import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OptionsService } from 'src/app/services/options/options.service';
import { Option } from 'src/app/models/Option';

@Component({
  selector: 'app-option',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './option.component.html',
  styleUrls: ['./option.component.css'],
})
export class OptionComponent implements OnInit {
  @Input() options: Option;

  constructor(private serviceOptions: OptionsService) {}
  public preview: any;

  ngOnInit(): void {
    this.preview = this.serviceOptions.getPreview(this.options.type);
  }

  toggle(type: string, action?: any, abbreviation?: string) {
    this.preview = abbreviation;
    if (type == 'grid') this.serviceOptions.updateGridClass(action);
    if (type == 'hover') this.serviceOptions.updateCardHoverClass(action);
    if (type == 'loadingSpeed') this.serviceOptions.updateLoadingSpeed(action);
    if (type == 'span') this.serviceOptions.updateSpanState(action);
    if (type == 'mobileGrid') this.serviceOptions.updateGridClassMobile(action);
  }
}
