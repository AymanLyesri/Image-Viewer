import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root',
})
export class AuthentificationService {
  constructor(private http: HttpClient, private router: Router) {}

  readonly url = environment.URL + '/api/login';
  private loggedIn: boolean;

  login(name: string, password: string) {
    const user: User = { name, password };

    this.http
      .post<{ response: string }>(this.url, user)
      .subscribe((Response) => {
        console.log('Response', Response.response);

        if ((Response.response as any) == 'OK') {
          this.router.navigateByUrl('/upload');
          this.loggedIn = true;
          localStorage.setItem('userData', JSON.stringify(user));
        }
      });
  }

  isLoggedIn() {
    return this.loggedIn;
  }
}
