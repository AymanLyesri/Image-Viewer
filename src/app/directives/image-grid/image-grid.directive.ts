import { AfterViewInit, Directive, ElementRef, Renderer2 } from '@angular/core';
import { OptionsService } from 'src/app/services/options/options.service';

@Directive({
  selector: '[appImageGrid]'
})
export class ImageGridDirective implements AfterViewInit
{
  oldColumnClass: string;

  constructor(
    private element: ElementRef,
    private render: Renderer2,
    private optionsService: OptionsService) { }

  ngAfterViewInit(): void
  {
    this.initGridClass();
    this.optionsService.getGridClass$.subscribe((columns) =>
    {
      this.toggleGrid(columns);
    });
  }

  initGridClass()
  {
    this.render.addClass(this.element.nativeElement, this.optionsService.getOption("grid") as any);
  }

  toggleGrid(columns: string)
  {
    this.render.removeClass(this.element.nativeElement, this.oldColumnClass);
    this.render.addClass(this.element.nativeElement, columns);
    this.oldColumnClass = columns;
  }

}
