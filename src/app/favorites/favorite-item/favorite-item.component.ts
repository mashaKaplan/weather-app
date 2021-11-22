import {Component, Input, OnInit} from '@angular/core';
import {LocationItem} from "../../utils/types";
import {Router} from "@angular/router";
import {MainService} from "../../services/main.service";

@Component({
  selector: 'app-favorite-item',
  templateUrl: './favorite-item.component.html',
  styleUrls: ['./favorite-item.component.scss']
})
export class FavoriteItemComponent implements OnInit {
  @Input() item: LocationItem | null = null;

  constructor(private router: Router, private mainSvc: MainService) { }

  ngOnInit(): void {
  }

  goToLocation() {
    this.router.navigateByUrl(`/main/?key=${this.item?.key}&city=${this.item?.city}`)
  }

}
