import {Component, OnDestroy, OnInit} from '@angular/core';
import {Employee} from "../employees.types";
import {ActivatedRoute} from "@angular/router";
import {Subject} from "rxjs";
import {takeUntil} from "rxjs/operators";

@Component({
  selector: 'app-employee-list-page',
  templateUrl: './employee-list-page.component.html',
  styleUrls: ['./employee-list-page.component.scss']
})
export class EmployeeListPageComponent implements OnInit, OnDestroy {
  employees: Employee[] | undefined;
  private readonly destroy$ = new Subject<void>();

  constructor(activatedRoute: ActivatedRoute) {
    activatedRoute.data.pipe(
      takeUntil(this.destroy$)
    ).subscribe(data => {

      this.employees = data.employees as Employee[];
    })
  }

  ngOnInit(): void {
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
