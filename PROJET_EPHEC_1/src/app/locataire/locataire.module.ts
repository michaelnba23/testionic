import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LocatairePageRoutingModule } from './locataire-routing.module';

import { LocatairePage } from './locataire.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    LocatairePageRoutingModule
  ],
  declarations: [LocatairePage]
})
export class LocatairePageModule {}
