import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-temperature',
  templateUrl: './temperature.component.html',
  styleUrls: ['./temperature.component.scss']
})
export class TemperatureComponent implements OnInit {
  @Input() value?: number = 0;
  @Input() type?: string = '';

  constructor() { }

  ngOnInit(): void {
  }

}
