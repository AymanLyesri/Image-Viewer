import { Directive, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appHiddenElement]',
})
export class HiddenElementDirective {
  constructor(element: ElementRef, private render: Renderer2) {
    this.observer.observe(element.nativeElement);
  }

  observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      entries[0].target.classList.add('hidden');
      setTimeout(() => entries[0].target.classList.add('show'), 100);
      this.observer.disconnect();
    }
  });
}
