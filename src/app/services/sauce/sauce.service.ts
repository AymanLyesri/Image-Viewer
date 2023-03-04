import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SauceService {
  constructor(private http: HttpClient) {}

  getSauce(imageUrl: string) {
    let params = new HttpParams().set('url', imageUrl);
    // params = params.set('api_key', environment.SAUCEAPIKEY);

    this.http
      .get('https://saucenao.com/search.php', {
        params: params,
        headers: { header: 'Access-Control-Allow-Origin' },
      })
      .subscribe((result) => {
        console.log(result);

        window.alert(result);
      });
  }
}
