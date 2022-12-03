import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appCursor]',
})
export class CursorDirective {
  @HostListener('mouseover', ['$event']) onMouseMove(event: MouseEvent) {
    console.log(event.clientX, event.clientY);
    this.render.setStyle(this.cursor, 'top', event.clientY + 'px');
    this.render.setStyle(this.cursor, 'left', event.clientX + 'px');
    console.log(this.cursor);
  }

  constructor(private render: Renderer2) {}

  cursor = document.querySelector('.cursor');
}
