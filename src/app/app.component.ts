import {Component, ElementRef, OnInit, Renderer2, ViewChild} from "@angular/core";
import { Observable } from "rxjs/Observable";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  public title: string;

  constructor() {
    this.title = "FulChan";
    Observable.create();
  }

  ngOnInit() {

  }
}
