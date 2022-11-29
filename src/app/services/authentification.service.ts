import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ResponseStatus } from '../models/response';

@Injectable({
  providedIn: 'root',
})
export class AuthentificationService {
  constructor(private http: HttpClient) {}

  readonly url = 'https://image-viewer-api-production.up.railway.app/api/login';
  private response: any;

  authentify(name: string, password: string) {
    this.http
      .post<{ response: ResponseStatus }>(this.url, {
        name: name,
        password: password,
      })
      .subscribe((Response) => {
        console.log('Response', Response.response);

        this.response = Response.response;
      });
  }

  getResponse() {
    return this.response;
  }
}
