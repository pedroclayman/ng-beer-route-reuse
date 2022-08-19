import {Component, OnDestroy} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Employee} from "../employees.types";
import {Subject} from "rxjs";
import {takeUntil} from "rxjs/operators";

@Component({
  selector: 'app-employee-detail-page',
  templateUrl: './employee-detail-page.component.html',
  styleUrls: ['./employee-detail-page.component.scss']
})
export class EmployeeDetailPageComponent implements OnDestroy {
  employee: Employee | undefined;
  private readonly destroy$ = new Subject<void>();

  constructor(activatedRoute: ActivatedRoute) {
    activatedRoute.data.pipe(
      takeUntil(this.destroy$)
    ).subscribe(data => this.employee = data.employee as Employee);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
