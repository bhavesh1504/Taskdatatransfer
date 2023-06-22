import { Directive, Input, OnInit, ElementRef } from '@angular/core';

@Directive({
  selector: '[appDatapassing]'
})
export class DatapassingDirective implements OnInit {
@Input('datapassing') data :any
  constructor(private element: ElementRef) { }

  ngOnInit() {
  this.element.nativeElement.dispatchEvent(new CustomEvent('datapassed', {
    bubbles: true,
    detail: this.data
  }));
  }
}
