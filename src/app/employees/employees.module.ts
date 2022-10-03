import {Injectable, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {EmployeeListPageComponent} from './employee-list/employee-list-page.component';
import {ActivatedRouteSnapshot, Resolve, RouterModule, RouterStateSnapshot, Routes} from "@angular/router";
import {ExpensiveComponent} from './expensive/expensive.component';
import {EmployeeDetailPageComponent} from './employee-detail-page/employee-detail-page.component';
import {Employee} from "./employees.types";
import {EmployeeHistoryPageComponent} from './employee-history-page/employee-history-page.component';
import {EmployeeEditPageComponent} from './employee-edit-page/employee-edit-page.component';
import {FormsModule} from "@angular/forms";
import {EmployeesStateService} from "./services/employees-state.service";
import {Observable, of} from "rxjs";
import {map, take} from "rxjs/operators";

const getParentResolve = <TResult>(route: ActivatedRouteSnapshot, dataProperty: string): TResult | undefined => {
  const value = route.data[dataProperty];
  if (value !== undefined) {
    return value;
  }
  if (route.parent) {
    return getParentResolve(route.parent, dataProperty);
  }

  return undefined;
}

@Injectable({ providedIn: 'root' })
export class EmployeesInvalidateResolver implements Resolve<void> {
  constructor(private employeesStateService: EmployeesStateService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    console.log('EmployeesInvalidateResolver');
    this.employeesStateService.invalidateCache();
  }
}

@Injectable({ providedIn: 'root' })
export class EmployeesResolver implements Resolve<Employee[]> {
  constructor(private employeesStateService: EmployeesStateService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Employee[]> {
    console.log('resolving employees');
    return this.employeesStateService.employees$.pipe(take(1));
  }
}

@Injectable({ providedIn: 'root' })
export class EmployeeDetailResolver implements Resolve<Employee | undefined> {

  constructor(private employeesStateService: EmployeesStateService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Employee | undefined> {
    console.log('resolving single employee');

    return this.employeesStateService.employees$.pipe(
      map(employees => employees.find(employee => employee.id === route.params['id'])),
      take(1),
    );
  }
}


const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: EmployeeListPageComponent,
        resolve: {
          employees: EmployeesResolver,
        },
      },
      {
        path: ':id',
        children: [
          {
            path: '',
            component: EmployeeDetailPageComponent,
          },
          {
            path: 'edit',
            component: EmployeeEditPageComponent,
          },
          {
            path: 'history',
            component: EmployeeHistoryPageComponent,
          },
        ],
        resolve: {
          employee: EmployeeDetailResolver
        },
      },
    ],
    resolve: {
      invalidate: EmployeesInvalidateResolver,
    }
  },

];

@NgModule({
  declarations: [
    EmployeeListPageComponent,
    ExpensiveComponent,
    EmployeeDetailPageComponent,
    EmployeeHistoryPageComponent,
    EmployeeEditPageComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
  ]
})
export class EmployeesModule { }
