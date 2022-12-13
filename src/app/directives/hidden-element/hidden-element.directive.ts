import { Directive, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appHiddenElement]',
})
export class HiddenElementDirective {
  constructor(element: ElementRef, private render: Renderer2) {
    this.observer.observe(element.nativeElement);
  }

  observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        this.render.addClass(entry.target, 'show');
        this.observer.disconnect();
      }
    });
  });
}
