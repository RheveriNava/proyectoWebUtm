import { TestBed } from '@angular/core/testing';

import { TipoprofesorService } from './tipoprofesor.service';

describe('TipoprofesorService', () => {
  let service: TipoprofesorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TipoprofesorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
