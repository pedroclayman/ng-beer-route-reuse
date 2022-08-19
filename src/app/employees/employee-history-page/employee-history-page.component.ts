import { Component, OnInit } from '@angular/core';
import {Employee} from "../employees.types";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-employee-history-page',
  templateUrl: './employee-history-page.component.html',
  styleUrls: ['./employee-history-page.component.scss']
})
export class EmployeeHistoryPageComponent implements OnInit {
  readonly employee: Employee | undefined;

  constructor(activatedRoute: ActivatedRoute) {
    this.employee = activatedRoute.snapshot.data.employee as Employee;
  }

  ngOnInit(): void {
  }

}
