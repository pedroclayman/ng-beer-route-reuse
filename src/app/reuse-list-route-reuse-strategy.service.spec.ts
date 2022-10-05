import { TestBed } from '@angular/core/testing';

import { ReuseListRouteReuseStrategyService } from './reuse-list-route-reuse-strategy.service';

describe('ReuseListRouteReuseStrategyService', () => {
  let service: ReuseListRouteReuseStrategyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReuseListRouteReuseStrategyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
