import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Employee} from "../employees.types";

@Component({
  selector: 'app-employee-detail-page',
  templateUrl: './employee-detail-page.component.html',
  styleUrls: ['./employee-detail-page.component.scss']
})
export class EmployeeDetailPageComponent implements OnInit {
  readonly employee: Employee | undefined;

  constructor(activatedRoute: ActivatedRoute) {
    this.employee = activatedRoute.snapshot.data.employee as Employee;
  }

  ngOnInit(): void {
  }

}
