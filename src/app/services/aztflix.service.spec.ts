import { TestBed } from '@angular/core/testing';

import { AztflixService } from './aztflix.service';

describe('AztflixService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AztflixService = TestBed.get(AztflixService);
    expect(service).toBeTruthy();
  });
});
