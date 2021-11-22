import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ImageUrlDirective} from "./derecives/image-url.directive";
import { TemperatureComponent } from './temperature/temperature.component';



@NgModule({
  declarations: [ImageUrlDirective, TemperatureComponent],
  exports: [ImageUrlDirective, TemperatureComponent],
  imports: [
    CommonModule
  ]
})
export class SharedModule { }
