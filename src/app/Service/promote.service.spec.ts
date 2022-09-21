import { TestBed } from '@angular/core/testing';

import { PromoteService } from './promote.service';

describe('PromoteService', () => {
  let service: PromoteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PromoteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
