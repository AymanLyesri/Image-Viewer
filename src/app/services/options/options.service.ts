import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OptionsService
{
  private loadingSpeed$ = new BehaviorSubject<number>(parseInt(localStorage.getItem('loadingSpeed')) || 1);
  public getLoadingSpeed$: Observable<number> = this.loadingSpeed$.asObservable();

  private gridClass$ = new BehaviorSubject<string>(localStorage.getItem('grid') || "mediumColumn");
  public getGridClass$: Observable<string> = this.gridClass$.asObservable();

  private cardHoverClass$ = new BehaviorSubject<string>(localStorage.getItem('hover') || "zoom");
  public getCardHoverClass$: Observable<string> = this.cardHoverClass$.asObservable();

  private spanState$ = new BehaviorSubject<boolean>(localStorage.getItem('span') == "true" || true);
  public getSpanState$: Observable<boolean> = this.spanState$.asObservable();

  constructor() { }

  updateOption(type: string, value: any)
  {
    switch (type) {
      case "grid":
        localStorage.setItem(type, value);
        this.gridClass$.next(value)
        break;
      case "loadingSpeed":
        localStorage.setItem(type, value);
        this.loadingSpeed$.next(value)
        break;
      case "hover":
        localStorage.setItem(type, value);
        this.cardHoverClass$.next(value)
        break;
      case "span":
        localStorage.setItem(type, value);
        this.spanState$.next(value)
        break;

      default:
        console.warn("option update not specified");
    }
  }

  getOption(type: string): any
  {
    switch (type) {
      case "grid":
        return this.gridClass$.getValue()
      case "loadingSpeed":
        return this.loadingSpeed$.getValue()
      case "hover":
        return this.cardHoverClass$.getValue()
      case "span":
        return this.spanState$.getValue()

      default:
        console.warn("option to get not specified");
        return

    }
  }
}
