import {Component, OnDestroy, OnInit} from '@angular/core';
import {Employee} from "../employees.types";
import {ActivatedRoute} from "@angular/router";
import {interval, Subject} from "rxjs";
import {map, takeUntil, tap} from "rxjs/operators";
import {EmployeesStateService} from "../services/employees-state.service";

@Component({
  selector: 'app-employee-list-page',
  templateUrl: './employee-list-page.component.html',
  styleUrls: ['./employee-list-page.component.scss']
})
export class EmployeeListPageComponent implements OnInit, OnDestroy {
  employees: Employee[] | undefined;
  private readonly destroy$ = new Subject<void>();

  readonly employeesFromStateService$ = this.employeesStateService.employees$;
  private readonly constructedAt: number;
  readonly aliveFor$ = interval(500).pipe(map(() => `${Math.floor((new Date().getTime() - this.constructedAt) / 1000)} seconds`));

  constructor(activatedRoute: ActivatedRoute, private employeesStateService: EmployeesStateService) {
    this.constructedAt = new Date().getTime();

    activatedRoute.data.pipe(
      takeUntil(this.destroy$),
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
