import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/internal/Subject';

@Injectable({
  providedIn: 'root',
})
export class OptionsService {
  private loadingSpeed$ = new Subject<number>();
  private gridClass$ = new Subject<string>();
  private gridClassMobile$ = new Subject<string>();
  private cardHoverClass$ = new Subject<string>();

  constructor() {}

  updateLoadingSpeed(speed: number) {
    this.loadingSpeed$.next(speed);
  }
  updateGridClass(gridClass: string) {
    this.gridClass$.next(gridClass);
  }
  updateGridClassMobile(gridClassMobile: string) {
    this.gridClassMobile$.next(gridClassMobile);
  }
  updateCardHoverClass(cardHoverClass: string) {
    this.cardHoverClass$.next(cardHoverClass);
  }

  getLoadingSpeed() {
    return this.loadingSpeed$.asObservable();
  }
  getGridClass() {
    return this.gridClass$.asObservable();
  }
  getGridClassMobile() {
    return this.gridClassMobile$.asObservable();
  }
  getCardHoverClass() {
    return this.cardHoverClass$.asObservable();
  }
}
