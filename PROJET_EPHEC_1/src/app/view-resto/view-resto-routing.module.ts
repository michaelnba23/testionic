import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewRestoPage } from './view-resto.page';

const routes: Routes = [
  {
    path: '',
    component: ViewRestoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewRestoPageRoutingModule {}
