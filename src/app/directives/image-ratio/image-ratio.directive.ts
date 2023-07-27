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

  spanClass: string[] = ["image-wide-1", "image-wide-2", "image-wide-3", "image-wide-4", "image-tall-1", "image-tall-3", "image-tall-2", "image-tall-4"]

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
    this.spanClass.forEach((elem) => this.render.removeClass(
      this.gridSection,
      elem
    ))
  }

  calculateRatio()
  {

    var realWidth = this.element.nativeElement.naturalWidth;
    var realHeight = this.element.nativeElement.naturalHeight;

    let ratio = realHeight / realWidth;

    if (realHeight > (realWidth * 1.2)) {

      this.render.addClass(
        this.gridSection,
        ratio <= 3 ? 'image-tall-1' : ratio <= 6 ? 'image-tall-2' : ratio <= 9 ? 'image-tall-3' : 'image-tall-4'

      );

    }
    else if (realWidth > (realHeight * 1.2)) {
      this.render.addClass(
        this.gridSection,
        ratio >= 0.4 ? 'image-wide-1' : ratio >= 0.3 ? 'image-wide-2' : ratio >= 0.2 ? 'image-wide-3' : 'image-wide-4'
      );

    }


  }
  ngOnDestroy(): void
  {

    this.updateSpanState.unsubscribe();
  }

}
