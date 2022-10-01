import {Component, OnDestroy} from '@angular/core';
import {Employee} from "../employees.types";
import {Subject} from "rxjs";
import {ActivatedRoute} from "@angular/router";
import {takeUntil} from "rxjs/operators";
import {EmployeesStateService} from "../services/employees-state.service";

@Component({
  selector: 'app-employee-edit-page',
  templateUrl: './employee-edit-page.component.html',
  styleUrls: ['./employee-edit-page.component.scss']
})
export class EmployeeEditPageComponent implements OnDestroy {
  employee: Employee | undefined;
  private readonly destroy$ = new Subject<void>();

  constructor(activatedRoute: ActivatedRoute, private employeesStateService: EmployeesStateService) {
    activatedRoute.data.pipe(
      takeUntil(this.destroy$)
    ).subscribe(data => this.employee = data.employee as Employee);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onEmployeeNameChange(name: string) {
    if (this.employee) {
      this.employee = {
        ...this.employee,
        name,
      };
    }
  }

  onSaveClick() {
    this.employeesStateService.invalidateCache();
  }
}
