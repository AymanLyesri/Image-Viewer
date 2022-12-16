import { Directive, Renderer2, ElementRef } from '@angular/core';

@Directive({
  selector: '[appImageRatio]',
})
export class ImageRatioDirective {
  constructor(element: ElementRef, private render: Renderer2) {
    element.nativeElement.onload = () => {
      var realWidth = element.nativeElement.naturalWidth;
      var realHeight = element.nativeElement.naturalHeight;

      if (realWidth / realHeight >= 1.4)
        this.render.addClass(element.nativeElement.parentElement, 'image-wide');
    };
  }
}