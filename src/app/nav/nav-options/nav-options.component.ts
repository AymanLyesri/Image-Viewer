import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavOption } from 'src/app/models/NavOption';
import { AppRoutingModule } from 'src/app/app-routing.module';

@Component({
  selector: 'app-nav-options',
  standalone: true,
  imports: [CommonModule, AppRoutingModule],
  templateUrl: './nav-options.component.html',
  styleUrls: ['./nav-options.component.css'],
})
export class NavOptionsComponent implements OnInit
{
  @Input() options: NavOption[];

  constructor() { }

  ngOnInit(): void { }

  scrollTo(element: any): void
  {
    (document.getElementById(element) as HTMLElement).scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });
  }
}
