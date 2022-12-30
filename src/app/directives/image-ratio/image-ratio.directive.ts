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
        var realWidth = this.element.nativeElement.naturalWidth;
        var realHeight = this.element.nativeElement.naturalHeight;

        if (realWidth / realHeight >= 1.4)
          this.render.addClass(
            this.element.nativeElement.parentElement,
            'image-wide'
          );
      };
    }

    this.options.getSpanState$().subscribe((state) => {
      console.log('btuh', state);
      if (
        state &&
        this.element.nativeElement.naturalWidth /
          this.element.nativeElement.naturalHeight >=
          1.4
      ) {
        this.render.addClass(
          this.element.nativeElement.parentElement,
          'image-wide'
        );
      } else {
        this.render.removeClass(
          this.element.nativeElement.parentElement,
          'image-wide'
        );
      }
    });
  }
}
