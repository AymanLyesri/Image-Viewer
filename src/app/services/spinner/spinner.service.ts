import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SpinnerService {
  private spinner$ = new BehaviorSubject<string>('');

  constructor() {}

  getSpinnerObserver(): Observable<string> {
    return this.spinner$.asObservable();
  }

  requestStarted() {
    this.spinner$.next('start');
  }

  requestEnded() {
    this.spinner$.next('stop');
  }
}
