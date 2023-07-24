import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SizeService
{
  private URL: string = environment.URL + '/api/';
  private fullSize = new Subject<number>();
  private fullLength = new Subject<number>();

  constructor(private http: HttpClient) { }

  getFull_Size_and_Length()
  {
    this.http
      .get<{ fullSize: number; fullLength: number }>(this.URL + 'size')
      .subscribe((result) =>
      {
        this.fullSize.next(result.fullSize);
        this.fullLength.next(result.fullLength);
      });
  }

  getFullSize()
  {
    return this.fullSize.asObservable();
  }
  getFullLength()
  {
    return this.fullLength.asObservable();
  }
}
