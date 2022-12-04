import { Directive, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appHiddenElement]',
})
export class HiddenElementDirective {
  constructor(element: ElementRef, private render: Renderer2) {
    render.addClass(element.nativeElement, 'hidden');
    this.observer.observe(element.nativeElement);
  }

  observer = new IntersectionObserver((entry) => {
    if (entry[0].isIntersecting) {
      entry[0].target.classList.add('show');
    } else {
      entry[0].target.classList.remove('show');
    }
  });
}
