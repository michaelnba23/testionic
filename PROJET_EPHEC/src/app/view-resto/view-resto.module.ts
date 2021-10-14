import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewRestoPageRoutingModule } from './view-resto-routing.module';

import { ViewRestoPage } from './view-resto.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewRestoPageRoutingModule
  ],
  declarations: [ViewRestoPage]
})
export class ViewRestoPageModule {}
