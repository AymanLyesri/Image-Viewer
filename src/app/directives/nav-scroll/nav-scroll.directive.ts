import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appNavScroll]',
})
export class NavScrollDirective {
  @HostListener('window:scroll', ['$event'])
  scrollListen(event: UIEvent): void {
    if (window.pageYOffset > 100) {
      this.render.addClass(this.element.nativeElement, 'nav-narrow');
    } else {
      this.render.removeClass(this.element.nativeElement, 'nav-narrow');
    }
  }

  constructor(private element: ElementRef, private render: Renderer2) {
    this.render.addClass(element.nativeElement, 'nav-wide');
  }
}
