import { Directive, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appHiddenElement]',
})
export class HiddenElementDirective {
  constructor(element: ElementRef, private render: Renderer2) {
    render.addClass(element.nativeElement, 'hidden');
    this.observer.observe(element.nativeElement);
  }

  options = {
    root: null as Element,
    rootMargin: '0px',
    threshold: 0.1,
  };

  observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
      } else {
        entry.target.classList.remove('show');
      }
    });
  }, this.options);
}
