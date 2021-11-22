import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {FavoritesComponent} from "./favorites/favorites.component";
import {MainComponent} from "./main/main.component";

const routes: Routes = [
  {path: 'favorites', loadChildren: () => import('./favorites/favorites.module').then(m => m.FavoritesModule)},
  {path: 'main', loadChildren: () => import('./main/main.module').then(m => m.MainModule)},
  {path: '**', redirectTo: 'main', pathMatch: 'full'}
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
