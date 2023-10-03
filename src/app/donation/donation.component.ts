import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-donation',
  templateUrl: './donation.component.html',
  styleUrls: ['./donation.component.css'],
})
export class DonationComponent implements OnInit
{
  public intro = environment.DONATIONINTRO
  public patreonLink = environment.PATREONLINK

  constructor() { }

  ngOnInit(): void { }
}
