import {Component, Input, OnInit} from '@angular/core';
import {AppComponent} from "../app.component";

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {
  readonly title: string;

  constructor(appComponent: AppComponent) {
    this.title = appComponent.title;
  }

  ngOnInit(): void {
  }

}
