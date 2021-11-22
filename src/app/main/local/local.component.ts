import { Component, OnInit } from '@angular/core';
import {MainService} from "../../services/main.service";

@Component({
  selector: 'app-local',
  templateUrl: './local.component.html',
  styleUrls: ['./local.component.scss']
})
export class LocalComponent implements OnInit {

  constructor(public mainSvc: MainService) { }

  ngOnInit(): void {
  }

}
