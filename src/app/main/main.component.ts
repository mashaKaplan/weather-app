import {Component, OnDestroy, OnInit} from '@angular/core';
import {WeatherItem} from "../utils/types";
import {MainService} from "../services/main.service";
import {FormControl} from "@angular/forms";
import {BehaviorSubject, Subject} from "rxjs";
import {filter, switchMap, takeUntil, tap} from "rxjs/operators";
import {MatAutocompleteSelectedEvent} from "@angular/material/autocomplete";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit, OnDestroy {
  searchCtrl: FormControl = new FormControl('');
  destroy$: Subject<any> = new Subject<any>();
  searchList$: BehaviorSubject<any> = new BehaviorSubject<any>([]);
  selectedLocation$: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(public mainSvc: MainService) { }

  ngOnInit(): void {
    this.searchCtrl.valueChanges.pipe(takeUntil(this.destroy$), filter(res => !!res && res.length >= 3), switchMap(res => this.mainSvc.getSearchList(res)))
      .subscribe(res => {
        this.searchList$.next(res);
      })

    this.selectedLocation$.pipe(takeUntil(this.destroy$),
      filter(res => !!res),
      // switchMap(res => this.mainSvc.getCurrentWeatherByPlace(res.Key))).subscribe()
      tap(res => this.mainSvc.currentLocation$.next({key: res.Key, city: res.LocalizedName}))).subscribe()
  }

  displayFn(location: any): string {
    return location && location.LocalizedName ? location.LocalizedName : '';
  }

  selectLocation(event: MatAutocompleteSelectedEvent): void {
    this.selectedLocation$.next(event.option.value);
  }

  toggleFavorite(): void {}

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.unsubscribe();
  }

}
