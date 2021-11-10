import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { IonicModule } from "@ionic/angular";

import { HomePage } from "./home.page";
import { HomePageRoutingModule } from "./home-routing.module";
import { RestoComponentModule } from "../resto/resto.module";

import { FormsModule, ReactiveFormsModule } from '@angular/forms';




@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    HomePageRoutingModule,
    RestoComponentModule,
  ],
  declarations: [HomePage],
})
export class HomePageModule {}
