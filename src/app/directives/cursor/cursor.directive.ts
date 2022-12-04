import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

// var cursor = document.querySelector('.cursor');

// document.addEventListener('mousemove', (event) => {
//   console.log(`Mouse X: ${event.clientX}, Mouse Y: ${event.clientY}`);
//   cursor.
// });

@Directive({
  selector: '[appCursor]',
})
export class CursorDirective {
  @HostListener('document:mouseover', ['$event']) onMouseMove(
    event: MouseEvent
  ) {
    console.log(event.clientX, event.clientY);
    this.render.setStyle(this.cursor, 'top', event.clientY + 'px');
    this.render.setStyle(this.cursor, 'left', event.clientX + 'px');
    console.log(this.cursor);
  }

  constructor(private element: ElementRef, private render: Renderer2) {}

  cursor = document.querySelector('.cursor');
}
