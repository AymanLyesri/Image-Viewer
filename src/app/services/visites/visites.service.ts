import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class VisitesService {
  constructor(private http: HttpClient) {}

  private readonly URL =
    'https://api.countapi.xyz/hit/' + environment.COUNTKEY + '/';

  private visitors: number;

  updateVisitors() {
    this.http.get<{ value: number }>(this.URL).subscribe((response) => {
      this.visitors = response.value;
      console.log(this.visitors);
    });
  }

  getVisitors() {
    return this.visitors;
  }
}
