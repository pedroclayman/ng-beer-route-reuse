import { TestBed } from '@angular/core/testing';

import { EmployeesStateService } from './employees-state.service';

describe('EmployeesStateService', () => {
  let service: EmployeesStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmployeesStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
