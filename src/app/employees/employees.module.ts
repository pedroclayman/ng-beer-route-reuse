import {Injectable, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {EmployeeListPageComponent} from './employee-list/employee-list-page.component';
import {ActivatedRouteSnapshot, Resolve, RouterModule, RouterStateSnapshot, Routes} from "@angular/router";
import {ExpensiveComponent} from './expensive/expensive.component';
import {EmployeeDetailPageComponent} from './employee-detail-page/employee-detail-page.component';
import {Employee} from "./employees.types";

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
        component: EmployeeDetailPageComponent,
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
    EmployeeDetailPageComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ]
})
export class EmployeesModule { }
