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
    // {
    //   routerLink: '/login',
    //   title: 'Login',
    //   svgUrl: '../../assets/user.svg',
    // },
    {
      routerLink: '/home',
      title: 'Home',
      svgUrl: '../../assets/home.svg',
    },
    {
      routerLink: '/posts/favorites',
      title: 'Favorites',
      svgUrl: '../../assets/heart-white.svg',
    },
    {
      externalLink: 'https://github.com/AymanLyesri/Image-Viewer',
      title: 'Github',
      svgUrl: '../../assets/github.svg',
    },
    {
      idLink: 'options',
      title: 'Options',
      svgUrl: '../../assets/settings.svg',
    },
  ];

  constructor() { }

  ngOnInit(): void { }
}
