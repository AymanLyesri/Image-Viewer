import { TestBed } from '@angular/core/testing';

import { SauceService } from './sauce.service';

describe('SauceService', () => {
  let service: SauceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SauceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
