import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { DataService } from "../services/data.service";

@Component({
  selector: "app-view-resto",
  templateUrl: "./view-resto.page.html",
  styleUrls: ["./view-resto.page.scss"],
})
export class ViewRestoPage implements OnInit {
  resto;

  constructor(
    private data: DataService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    const id = this.activatedRoute.snapshot.paramMap.get("id");
    this.data.getRestoByKey(id).subscribe((res) => (this.resto = res));
  }

  getBackButtonText() {
    const win = window as any;
    const mode = win && win.Ionic && win.Ionic.mode;
    return mode === "ios" ? "Restos" : "";
  }
}
