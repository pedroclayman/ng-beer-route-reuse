import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, BaseRouteReuseStrategy, DetachedRouteHandle, Route} from "@angular/router";
import {EmployeeListPageComponent} from "./employees/employee-list/employee-list-page.component";

@Injectable({
  providedIn: 'root'
})
export class ReuseListRouteReuseStrategyService extends BaseRouteReuseStrategy {

  private readonly map = new Map<Route, DetachedRouteHandle>();

  shouldDetach(route: ActivatedRouteSnapshot): boolean {
    return this.isEmployeesList(route);
  }

  store(route: ActivatedRouteSnapshot, detachedTree: DetachedRouteHandle) {
    if (route.routeConfig) {
      this.map.set(route.routeConfig, detachedTree);
    }
  }

  shouldAttach(route: ActivatedRouteSnapshot): boolean {
    return route.routeConfig != null && this.map.has(route.routeConfig) && this.isEmployeesList(route);
  }

  retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle | null {
    return route.routeConfig ? this.map.get(route.routeConfig) ?? null : null;
  }

  private isEmployeesList(route: ActivatedRouteSnapshot) {
    // bit of a naive implementation
    return route.routeConfig?.component === EmployeeListPageComponent;
  }
}
