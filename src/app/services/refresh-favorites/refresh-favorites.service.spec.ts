import { TestBed } from '@angular/core/testing';

import { RefreshFavoritesService } from './refresh-favorites.service';

describe('RefreshFavoritesService', () => {
  let service: RefreshFavoritesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RefreshFavoritesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
