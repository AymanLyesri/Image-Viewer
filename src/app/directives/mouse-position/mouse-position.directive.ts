import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[appMousePosition]'
})
export class MousePositionDirective
{

  constructor() { }

  @HostListener('mousemove', ['$event']) onMouseMove(event: any)
  {
    console.log(event.clientX, event.clientY);
  }

}
