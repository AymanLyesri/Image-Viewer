import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class VisitesService
{
  constructor(private http: HttpClient) { }

  private visits$ = new Subject<number>();

  private readonly KEY = "VWSArqmGnEIf42+6ypMzhQ==s8XDaOIOowM2sucy"

  private readonly URL: string =
    'https://api.api-ninjas.com/v1/counter?hit=false&id=' + environment.COUNTKEY;

  updateVisitors()
  {
    console.log(this.URL);

    var headers = new HttpHeaders().set("X-Api-Key", this.KEY);

    this.http.get<{ value: number }>(this.URL, { headers: headers }).subscribe((response) =>
    {
      console.log(response.value);

      this.visits$.next(response.value);
    });
  }

  getVisitors()
  {
    return this.visits$.asObservable();
  }
}
