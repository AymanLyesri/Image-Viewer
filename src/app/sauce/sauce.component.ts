import { Component, OnInit } from '@angular/core';
import { SauceService } from '../services/sauce/sauce.service';

@Component({
  selector: 'app-sauce',
  templateUrl: './sauce.component.html',
  styleUrls: ['./sauce.component.css'],
})
export class SauceComponent implements OnInit {
  constructor(private sauceService: SauceService) {}

  ngOnInit(): void {
    this.sauceService.getSauce(
      'https://ik.imagekit.io/3njnkmvef/all/art-1699977_960_720_GCmTaDFwp.jpg'
    );
  }
}
