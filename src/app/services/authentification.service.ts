import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { ResponseStatus } from '../models/response';

@Injectable({
  providedIn: 'root',
})
export class AuthentificationService {
  constructor(private http: HttpClient, private router: Router) {}

  readonly url = environment.URL + '/api/login';
  private loggedIn: boolean;

  login(name: string, password: string) {
    this.http
      .post<{ response: ResponseStatus }>(this.url, {
        name: name,
        password: password,
      })
      .subscribe((Response) => {
        console.log('Response', Response.response);

        if ((Response.response as any) == 'OK') {
          this.router.navigateByUrl('/upload');
          this.loggedIn = true;
        }
      });
  }

  isLoggedIn() {
    return this.loggedIn;
  }
}
