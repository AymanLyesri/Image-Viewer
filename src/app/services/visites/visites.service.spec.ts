import { TestBed } from '@angular/core/testing';

import { VisitesService } from './visites.service';

describe('VisitesService', () => {
  let service: VisitesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VisitesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
