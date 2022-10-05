import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IndexComponent } from './index/index.component';
import {RouteReuseStrategy} from "@angular/router";
import {ReuseListRouteReuseStrategyService} from "./reuse-list-route-reuse-strategy.service";

@NgModule({
  declarations: [
    AppComponent,
    IndexComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [{
    provide: RouteReuseStrategy,
    useClass: ReuseListRouteReuseStrategyService,
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
