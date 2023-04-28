import { Directive, Renderer2, ElementRef, AfterViewInit } from '@angular/core';
import { OptionsService } from 'src/app/services/options/options.service';

@Directive({
  selector: '[appImageRatio]',
})
export class ImageRatioDirective implements AfterViewInit {
  spanState: boolean;

  constructor(
    private element: ElementRef,
    private render: Renderer2,
    private options: OptionsService
  ) {}

  ngAfterViewInit(): void {
    if (this.options.getSpanState()) {
      this.element.nativeElement.onload = () => {
        this.calculate();
      };
    }

    this.options.getSpanState$().subscribe((state) => {
      console.log('btuh', state);
      if (state == false) {
        this.render.removeClass(
          this.element.nativeElement.parentElement,
          'image-wide'
        );
        this.render.removeClass(
          this.element.nativeElement.parentElement,
          'image-tall'
        );
        return;
      }
      this.calculate();
    });
  }

  calculate() {
    var realWidth = this.element.nativeElement.naturalWidth;
    var realHeight = this.element.nativeElement.naturalHeight;

    if (realWidth / realHeight >= 1.2) {
      this.render.addClass(
        this.element.nativeElement.parentElement,
        'image-wide'
      );
    } else if (realWidth / realHeight <= 0.4) {
      this.render.addClass(
        this.element.nativeElement.parentElement,
        'image-tall'
      );
    }
  }
}
