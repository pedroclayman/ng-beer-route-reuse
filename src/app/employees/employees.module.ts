import {Injectable, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {EmployeeListPageComponent} from './employee-list/employee-list-page.component';
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  Resolve,
  RouterModule,
  RouterStateSnapshot,
  Routes
} from "@angular/router";
import {ExpensiveComponent} from './expensive/expensive.component';
import {EmployeeDetailPageComponent} from './employee-detail-page/employee-detail-page.component';
import {Employee} from "./employees.types";
import { EmployeeHistoryPageComponent } from './employee-history-page/employee-history-page.component';
import { EmployeeEditPageComponent } from './employee-edit-page/employee-edit-page.component';
import {FormsModule} from "@angular/forms";
import {EmployeesStateService} from "./services/employees-state.service";
import {Observable} from "rxjs";
import {take} from "rxjs/operators";

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
export class EmployeesResolver implements Resolve<Employee[]> {
  constructor(private employeesStateService: EmployeesStateService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Employee[]> {
    console.log('resolving employees');
    this.employeesStateService.invalidateCache();
    return this.employeesStateService.employees$.pipe(take(1));
  }
}

@Injectable({ providedIn: 'root' })
export class EmployeeDetailResolver implements Resolve<Employee | undefined> {

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Employee | undefined {
    console.log('resolving single employee');

    const employees = getParentResolve<Employee[]>(route, 'employees');
    return employees?.find(employee => employee.id === route.params['id']);
  }
}


const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: EmployeeListPageComponent,
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
      }
    ],
    resolve: {
      employees: EmployeesResolver,
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
