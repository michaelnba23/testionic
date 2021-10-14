import { Component, Input, OnInit } from "@angular/core";
import { Resto } from "../services/data.service";

@Component({
  selector: "app-resto",
  templateUrl: "./resto.component.html",
  styleUrls: ["./resto.component.scss"],
})
export class RestoComponent implements OnInit {
  @Input() resto: Resto;
  constructor() {}

  ngOnInit() {
    console.log(this.resto);
  }

  isIos() {
    const win = window as any;
    return win && win.Ionic && win.Ionic.mode === "ios";
  }
}
