import { Directive, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appHiddenElement]',
})
export class HiddenElementDirective {
  constructor(element: ElementRef, private render: Renderer2) {
    render.addClass(element.nativeElement, 'hidden');
    this.observer.observe(element.nativeElement);
  }

  observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      entries[0].target.classList.add('show');
      entries.forEach((entry) => {
        this.observer.unobserve(entry.target);
      });
    }
  });
}
