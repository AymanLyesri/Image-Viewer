import { ReturnStatement } from '@angular/compiler';
import { Directive, Renderer2, ElementRef, AfterViewInit, OnInit, OnDestroy } from '@angular/core';
import { Subscribable, Subscription } from 'rxjs';
import { OptionsService } from 'src/app/services/options/options.service';

@Directive({
  selector: '[appImageRatio]',
  standalone: true,
})
export class ImageRatioDirective implements AfterViewInit, OnDestroy
{
  spanState: boolean;
  gridSection: Element;
  updateSpanState: Subscription;

  constructor(
    private element: ElementRef,
    private render: Renderer2,
    private optionsService: OptionsService
  )
  {
    this.gridSection = this.element.nativeElement.parentElement.parentElement.parentElement.parentElement
  }

  ngAfterViewInit(): void
  {
    this.element.nativeElement.onload = () =>
    {

      this.updateSpanState = this.optionsService.getSpanState$.subscribe((state) =>
      {
        if (!state) {
          console.log(state);
          this.removeCLass(); return
        }

        this.calculateRatio();
      });
    }
  }

  removeCLass()
  {

    this.render.removeClass(
      this.gridSection,
      'image-wide'
    );
    this.render.removeClass(
      this.gridSection,
      'image-tall'
    );
    this.render.removeClass(
      this.gridSection,
      'image-big'
    );
  }

  calculateRatio()
  {

    var realWidth = this.element.nativeElement.naturalWidth;
    var realHeight = this.element.nativeElement.naturalHeight;

    this.render.addClass(
      this.gridSection,
      realHeight / realWidth >= 1.25 ? 'image-tall' : realWidth / realHeight >= 1.25 ? 'image-wide' : 'image-big'
    );


  }
  ngOnDestroy(): void
  {
    this.updateSpanState.unsubscribe();
  }

}
