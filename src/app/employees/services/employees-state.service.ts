import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, of, Subject} from "rxjs";
import {Employee} from "../employees.types";
import {delay, publishReplay, share, shareReplay, switchMap, take, tap} from "rxjs/operators";

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
export class EmployeesStateService {
  readonly employees$: Observable<Employee[]>;
  private readonly cacheInvalidated = new BehaviorSubject<void>(undefined);

  private employeeCache: Employee[] | null = null;

  constructor() {
    this.employees$ = this.cacheInvalidated.pipe(
      switchMap(() => {
        if (!this.employeeCache) {
          return fakeEmployeesViaHttp()
            .pipe(
              tap(employees => this.employeeCache = employees)
            );
        }
        return of(this.employeeCache);
      }),
      share()
    );

  }

  invalidateCache() {
    this.employeeCache = null;
    this.cacheInvalidated.next();
  }
}
