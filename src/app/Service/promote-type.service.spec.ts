import { TestBed } from '@angular/core/testing';

import { PromoteTypeService } from './promote-type.service';

describe('PromoteTypeService', () => {
  let service: PromoteTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PromoteTypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
