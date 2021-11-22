import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, combineLatest, forkJoin, Observable, ReplaySubject} from "rxjs";
import {API_KEY, LocationItem, WeatherItem} from "../utils/types";
import {filter, switchMap} from "rxjs/operators";
import {ActivatedRoute} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class MainService {
  currentLocation$: BehaviorSubject<LocationItem | null> = new BehaviorSubject<LocationItem | null>(null);
  currentLocationWeather$: BehaviorSubject<LocationItem | null> = new BehaviorSubject<LocationItem | null>(null);
  local5daysWeather$: BehaviorSubject<WeatherItem[]> = new BehaviorSubject<WeatherItem[]>([]);
  favoriteLocations$: BehaviorSubject<LocationItem[] | any> = new BehaviorSubject<LocationItem[] | any>([]);
  initialLocation$: BehaviorSubject<LocationItem | null> = new BehaviorSubject<LocationItem | null>(null);

  constructor(private httpSvc: HttpClient, private router: ActivatedRoute) {
    this.router.queryParams.subscribe(res => {
      if (res && Object.keys(res).length) {
        this.currentLocation$.next({key: res.key, city: res.city} as LocationItem);
      } else if ((!res || (res && !Object.keys(res).length)) && this.currentLocation$.getValue()) {
        this.currentLocation$.next(this.initialLocation$.getValue());
      } else if (!this.currentLocation$.getValue()){
        this.getCurrentLocation();
      }
    });
    this.setFavoritesFromStorage();
    this.currentLocation$
      .pipe(
        filter((res: any) => !!res),
        switchMap((res: LocationItem) => forkJoin([this.getCurrentWeatherByPlace(res.key), this.get5DaysWeather(res?.key)])))
      .subscribe(res => {
        const [currentPlace, fiveDays] = res;
        this.local5daysWeather$.next(fiveDays['DailyForecasts']);
        const favorites = this.favoriteLocations$.getValue();
        let currentLocation = this.currentLocation$.getValue();
        currentLocation = this.buildLocationItem(currentLocation, currentPlace[0], favorites.some((fav: LocationItem) => fav.key === currentLocation?.key));
        this.currentLocationWeather$.next(currentLocation);
      });

    this.favoriteLocations$.subscribe(res => {
      const mappedFavToSave = res.map((item: LocationItem) => {
        return {
          key: item.key,
          city: item.city
        }
      });
      localStorage.setItem('favorites', JSON.stringify(mappedFavToSave));
    })
  }

  buildLocationItem = (initialData: {key: string, city: string} | null, fullData: any, isFavorite: boolean): LocationItem | null => {
    if (!initialData) return null;
    return {
      ...initialData,
      currentTempValue: fullData.Temperature.Metric.Value,
      currentTempType: fullData.Temperature.Metric.Unit,
      currentTempDescription: fullData.WeatherText,
      currentTempIcon: fullData.WeatherIcon,
      isFavorite
    }
  }

  getCurrentLocation(): void {
    let lat$: ReplaySubject<number> = new ReplaySubject<number>();
    let long$: ReplaySubject<number> = new ReplaySubject<number>();
    const showPosition = (position: GeolocationPosition) => {
      lat$.next(position.coords.latitude);
      long$.next(position.coords.longitude);
    }
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    } else {
      // Tel Aviv coordinates
      lat$.next(32.0853);
      long$.next(34.7818);
    }
    combineLatest([lat$, long$]).subscribe(res => {
      this.httpSvc.get(`http://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=${API_KEY}&q=${res[0]},${res[1]}`)
        .subscribe((res: any) => {
          const initialLoc = {key: res.Key, city: res.EnglishName};
          this.currentLocation$.next(initialLoc);
          this.initialLocation$.next(initialLoc);
        });
    })

  }

  getCurrentWeatherByPlace(key: string): Observable<any> {
    return this.httpSvc.get(`http://dataservice.accuweather.com/currentconditions/v1/${key}?apikey=${API_KEY}`)
  }

  get5DaysWeather(key: string): Observable<any> {
    return this.httpSvc.get(`http://dataservice.accuweather.com/forecasts/v1/daily/5day/${key}?apikey=${API_KEY}&metric=true`)
  }

  getSearchList(query: string): Observable<any> {
    return this.httpSvc.get(`http://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=${API_KEY}&q=${query}`);
  }

  toggleFavorite() {
    let currentLocation = this.currentLocationWeather$.getValue();
    currentLocation = {
      ...currentLocation,
      isFavorite: !currentLocation?.isFavorite
    } as LocationItem;
    this.currentLocationWeather$.next(currentLocation);

    let currentFav = this.favoriteLocations$.getValue();
    if (currentLocation.isFavorite) {
      if (currentFav && currentFav.length < 5) {
        currentFav.push(currentLocation)
      } else {
        currentFav?.shift();
        currentFav?.push(currentLocation)
      }
    } else {
      currentFav = currentFav.filter((fav: LocationItem) => fav.key !== currentLocation?.key);
    }

    this.favoriteLocations$.next(currentFav);
  }

  private setFavoritesFromStorage() {
    const savedFavorites = localStorage.getItem('favorites');
    if (savedFavorites) {
      const savedFavoritesArr = Array.from(JSON.parse(savedFavorites)) as { key: string, city: string }[];
      this.favoriteLocations$.next(savedFavoritesArr);
      forkJoin(savedFavoritesArr.map(fav => this.getCurrentWeatherByPlace(fav.key)))
        .subscribe(res => {
          const favoriteItems = res.map((item, idx: number) => {
            return this.buildLocationItem(savedFavoritesArr[idx], item[0], true);
          });
          this.favoriteLocations$.next(favoriteItems);
        })
    }
  }
}
