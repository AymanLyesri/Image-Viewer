import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RefreshFavoritesService {
  constructor() {}

  refresh$ = new Subject<boolean>();

  setRefreshRequest() {
    this.refresh$.next(true);
  }

  refresh() {
    return this.refresh$.asObservable();
  }
}
