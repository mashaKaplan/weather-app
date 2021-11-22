import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FavoriteItemComponent } from './favorite-item/favorite-item.component';
import {FavoritesComponent} from "./favorites.component";
import {FavoritesRoutingModule} from "./favorites-routing.module";
import {SharedModule} from "../shared/shared.module";

const components = [FavoriteItemComponent, FavoritesComponent];

@NgModule({
  declarations: [
    ...components
  ],
  exports: [...components],
  imports: [
      CommonModule,
      FavoritesRoutingModule,
      SharedModule
  ]
})
export class FavoritesModule { }
