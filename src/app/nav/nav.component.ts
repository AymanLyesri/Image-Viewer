import { Component, OnInit } from '@angular/core';
import { NavOption } from '../models/NavOption';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent implements OnInit
{
  navOptions: NavOption[] = [
    {
      routerLink: '/login',
      title: 'Login',
      svgUrl: '../../assets/user-solid-light.svg',
    },
    {
      routerLink: '/home',
      title: 'Home',
      svgUrl: '../../assets/house-solid-light.svg',
    },
    // {
    //   routerLink: '/posts/favorites',
    //   title: 'Favorites',
    //   svgUrl: '../../assets/heart-992.svg',
    // },
    {
      externalLink: 'https://github.com/AymanLyesri/Image-Viewer',
      title: 'Github',
      svgUrl: '../../assets/icons8-github.svg',
    },
    {
      idLink: 'options',
      title: 'Options',
      svgUrl: '../../assets/icons8-settings.svg',
    },
  ];

  constructor() { }

  ngOnInit(): void { }
}
