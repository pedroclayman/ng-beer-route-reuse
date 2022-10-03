import {Injectable, OnDestroy} from '@angular/core';
import {Observable, of, ReplaySubject, Subject} from "rxjs";
import {Employee} from "../employees.types";
import {delay, filter, switchMap, takeUntil, tap} from "rxjs/operators";

const fakeEmployeesViaHttp: () => Observable<Employee[]> = () => {
  const timestamp = new Intl.DateTimeFormat('sk-SK', {hour: '2-digit', minute: '2-digit', second: '2-digit'}).format(new Date());
  return of([
    { id: '1', name: 'Adam', timestamp },
    { id: '2', name: 'Bertha', timestamp },
    { id: '3', name: 'Celeste', timestamp },
    { id: '4', name: 'Daniel', timestamp },
    { id: '5', name: 'Eric', timestamp },
  ]).pipe(
    tap(() => console.log('🚨️ HTTP CALL')),
    delay(2000),
  );
}


@Injectable({
  providedIn: 'root'
})
export class EmployeesStateService implements OnDestroy {
  private readonly cacheInvalidated = new Subject<void>();

  private employeeCache = new ReplaySubject<Employee[]>(1);
  readonly employees$ = this.employeeCache.asObservable()
    .pipe(
      filter(() => this.hasFreshData)
    );

  private readonly destroy$ = new Subject<void>();
  private hasFreshData = false;

  constructor() {
    this.cacheInvalidated.pipe(
      takeUntil(this.destroy$),
      switchMap(() => fakeEmployeesViaHttp()),
      tap(() => this.hasFreshData = true)
    ).subscribe(employees => this.employeeCache.next(employees));
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  invalidateCache() {
    this.hasFreshData = false;
    this.cacheInvalidated.next();
  }
}
