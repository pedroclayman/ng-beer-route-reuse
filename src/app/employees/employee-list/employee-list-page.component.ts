import {Component, OnInit} from '@angular/core';
import {Employee} from "../employees.types";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-employee-list-page',
  templateUrl: './employee-list-page.component.html',
  styleUrls: ['./employee-list-page.component.scss']
})
export class EmployeeListPageComponent implements OnInit {
  readonly employees: Employee[];

  constructor(activatedRoute: ActivatedRoute) {
    this.employees = activatedRoute.snapshot.data.employees as Employee[];
  }
  ngOnInit(): void {
  }

}
