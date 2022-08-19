import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IndexComponent } from './index/index.component';
import {RouteReuseStrategy} from "@angular/router";
import {ReuseEmployeeRouteReuseStrategyService} from "./reuse-employee-route-reuse-strategy.service";

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
    useClass: ReuseEmployeeRouteReuseStrategyService,
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
