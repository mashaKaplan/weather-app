import {Component, Input, OnInit} from '@angular/core';
import {WeatherItem} from "../../utils/types";

@Component({
  selector: 'app-main-item',
  templateUrl: './main-item.component.html',
  styleUrls: ['./main-item.component.scss']
})
export class MainItemComponent implements OnInit {
  @Input() item: WeatherItem | null = null;

  constructor() { }

  ngOnInit(): void {
  }

}
