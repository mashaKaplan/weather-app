import {Directive, ElementRef, Input, OnInit} from '@angular/core';

@Directive({
  selector: '[appImageUrl]'
})
export class ImageUrlDirective implements OnInit{
  @Input() appImageUrl: number = 0;
  currentEl: ElementRef;

  constructor(el: ElementRef) {
    this.currentEl = el;
  }

  ngOnInit() {
    const imageNum = this.appImageUrl < 10 ? `0${this.appImageUrl}` : this.appImageUrl;
    this.currentEl.nativeElement.style.backgroundImage = `url(https://developer.accuweather.com/sites/default/files/${imageNum}-s.png)`
  }

}
