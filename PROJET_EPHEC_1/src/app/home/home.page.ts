import { Component } from "@angular/core";
import { Observable } from "rxjs";
import { DataService, Resto } from "../services/data.service";


@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"],
})
export class HomePage {
  restaurants;

  constructor(private data: DataService) {
    this.loadData();
  }

  loadData() {
    this.restaurants = this.data.getRestos();
  }

  addinfo() {
    this.data.addinfo();
  }

  addResto() {
    this.data.addRestaurant();
  }

  refresh(ev) {
    setTimeout(() => {
      ev.detail.complete();
    }, 1000);
  }

  // getMessages(): Message[] {
  //   return this.data.getMessages();
  // }
}
