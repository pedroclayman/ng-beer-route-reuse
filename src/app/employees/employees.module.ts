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
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Employee[] {
    console.log('resolving employees');

    return [
      { id: '1', name: 'Adam', random: Math.random() },
      { id: '2', name: 'Bertha', random: Math.random() },
      { id: '3', name: 'Celeste', random: Math.random() },
      { id: '4', name: 'Daniel', random: Math.random() },
      { id: '5', name: 'Eric', random: Math.random() },
    ];
  }
}

@Injectable({ providedIn: 'root' })
export class EmployeeDetailResolver implements Resolve<Employee | undefined> {

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Employee | undefined {
    console.log('resolving employee');

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
    EmployeeHistoryPageComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ]
})
export class EmployeesModule { }
