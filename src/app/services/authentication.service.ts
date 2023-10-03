import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { User } from '../models/User';
import { Subject, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService
{
  constructor(private http: HttpClient) { }

  readonly url = environment.URL + '/api/login';
  private loggedIn: Subject<boolean>;

  login(name: string, password: string)
  {
    const user: User = { name, password };

    return this.http
      .post(this.url, user).pipe(map((response: any) =>
      {
        console.log('Response', response.response);

        if (response.response == 1) {
          localStorage.setItem('userData', JSON.stringify(user));
          return true
        }
        return false
      }))
  }

  isLoggedIn()
  {
    const user: User = JSON.parse(localStorage.getItem('userData'))
    // return this.login(user.name, user.password)
    return true

  }
}
