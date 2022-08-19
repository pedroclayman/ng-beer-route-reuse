import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, BaseRouteReuseStrategy, DetachedRouteHandle, Route} from "@angular/router";
import {EmployeeListPageComponent} from "./employees/employee-list/employee-list-page.component";
import {EmployeeDetailPageComponent} from "./employees/employee-detail-page/employee-detail-page.component";

@Injectable({
  providedIn: 'root'
})
export class ReuseEmployeeRouteReuseStrategyService extends BaseRouteReuseStrategy {

  private readonly map = new Map<Route, DetachedRouteHandle>();

  shouldDetach(route: ActivatedRouteSnapshot): boolean {
    return this.isEmployeeRoute(route);
  }

  store(route: ActivatedRouteSnapshot, detachedTree: DetachedRouteHandle) {
    if (route.routeConfig) {
      this.map.set(route.routeConfig, detachedTree);
    }
  }

  shouldAttach(route: ActivatedRouteSnapshot): boolean {
    return route.routeConfig != null && this.map.has(route.routeConfig) && this.isEmployeeRoute(route);
  }

  retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle | null {
    return route.routeConfig ? this.map.get(route.routeConfig) ?? null : null;
  }

  private isEmployeeRoute(route: ActivatedRouteSnapshot) {
    // bit of a naive implementation
    return route.routeConfig?.component === EmployeeListPageComponent || route.routeConfig?.component === EmployeeDetailPageComponent;
  }
}
