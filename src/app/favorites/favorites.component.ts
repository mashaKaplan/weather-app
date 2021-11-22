import {Component, Input, OnInit} from '@angular/core';
import {LocationItem, WeatherItem} from "../utils/types";
import {MainService} from "../services/main.service";

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent implements OnInit {
  constructor(public mainSvc: MainService) { }

  ngOnInit(): void {
  }

}

