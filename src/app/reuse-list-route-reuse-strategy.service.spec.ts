import { TestBed } from '@angular/core/testing';

import { ReuseEmployeeRouteReuseStrategyService } from './reuse-employee-route-reuse-strategy.service';

describe('ReuseListRouteReuseStrategyService', () => {
  let service: ReuseEmployeeRouteReuseStrategyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReuseEmployeeRouteReuseStrategyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
