import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {FavoritesComponent} from "./favorites.component";

const route: Routes = [
  {path: '', component: FavoritesComponent}
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(route)
  ],
  exports: [RouterModule]
})
export class FavoritesRoutingModule { }
