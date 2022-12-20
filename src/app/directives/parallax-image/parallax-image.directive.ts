import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appParallaxImage]',
})
export class ParallaxImageDirective {
  @Input('ParallaxImageDirective') options: any;
  ngAfterViewInit(): void {
    if (!this.options.apply) {
      return;
    }

    // directive logic
  }

  @HostListener('mousemove', ['$event']) mousePos(event: MouseEvent) {
    let x = event.clientX;

    let y = event.clientY;
    this.element.nativeElement.style.marginInline =
      -x / 30 + 'px' + ' ' + x / 30 + 'px';
    this.element.nativeElement.style.marginBlock =
      -y / 30 + 'px' + ' ' + y / 30 + 'px';
  }
  @HostListener('mouseleave', ['$event']) mouseLeave(event: MouseEvent) {
    this.element.nativeElement.style.margin = '0px';
  }

  constructor(private element: ElementRef<HTMLElement>) {}
}
