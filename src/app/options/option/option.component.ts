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
export class OptionComponent implements OnInit
{
  @Input() option: Option;

  constructor(private serviceOptions: OptionsService) { }
  public preview: any;

  ngOnInit(): void
  {
    this.preview = this.serviceOptions.getOption(this.option.type);
  }

  toggle(type: string, action?: any, abbreviation?: string)
  {
    this.preview = action;
    this.serviceOptions.updateOption(type, action)
  }
}
