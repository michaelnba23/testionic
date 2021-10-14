import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";

import { IonicModule } from "@ionic/angular";

import { RestoComponent } from "./resto.component";

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, RouterModule],
  declarations: [RestoComponent],
  exports: [RestoComponent],
})
export class RestoComponentModule {}
