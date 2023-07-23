import { AfterViewInit, Directive, ElementRef, Renderer2, ɵisStandalone } from '@angular/core';
import { OptionsService } from 'src/app/services/options/options.service';

@Directive({
  selector: '[appImageHover]',
  standalone: true,
})
export class ImageHoverDirective implements AfterViewInit
{

  initialHoverClass: any;

  constructor(private element: ElementRef,
    private render: Renderer2,
    private options: OptionsService)
  {

  }

  ngAfterViewInit(): void
  {

    this.options.getCardHoverClass$.subscribe((zoom) =>
    {
      if (zoom == this.initialHoverClass) return;
      this.toggleHover(zoom);
    });
    this.initHover();
  }

  initHover()
  {
    this.initialHoverClass = this.options.getOption("hover");
    this.render.addClass(this.element.nativeElement, this.initialHoverClass);
  }

  toggleHover(zoom: string)
  {

    this.render.removeClass(this.element.nativeElement, this.initialHoverClass);
    this.render.addClass(this.element.nativeElement, zoom);

    this.initialHoverClass = zoom;
  }

}
