import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class VisitesService {
  constructor(private http: HttpClient) {}

  private visits$ = new Subject<number>();

  private readonly URL =
    'https://api.countapi.xyz/hit/' + environment.COUNTKEY + '/';

  updateVisitors() {
    this.http.get<{ value: number }>(this.URL).subscribe((response) => {
      this.visits$.next(response.value);
    });
  }

  getVisitors() {
    return this.visits$.asObservable();
  }
}
