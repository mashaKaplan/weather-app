import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LocalComponent } from './local/local.component';
import {MainComponent} from "./main.component";
import {MainRoutingModule} from "./main-routing.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {MatTooltipModule} from "@angular/material/tooltip";
import {SharedModule} from "../shared/shared.module";
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatOptionModule} from "@angular/material/core";
import {MainItemComponent} from "./main-item/main-item.component";


const components = [MainComponent, LocalComponent, MainItemComponent];

@NgModule({
  declarations: [
    ...components
  ],
  exports: [...components],
  imports: [
    CommonModule,
    MainRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    MatAutocompleteModule,
    MatOptionModule
  ]
})
export class MainModule { }
