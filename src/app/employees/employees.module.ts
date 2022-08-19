import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeListPageComponent } from './employee-list/employee-list-page.component';
import {RouterModule, Routes} from "@angular/router";


const routes: Routes = [
  {
    path: '',
    redirectTo: 'list',
  },
  {
    path: 'list',
    component: EmployeeListPageComponent,
  }
];

@NgModule({
  declarations: [
    EmployeeListPageComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ]
})
export class EmployeesModule { }
