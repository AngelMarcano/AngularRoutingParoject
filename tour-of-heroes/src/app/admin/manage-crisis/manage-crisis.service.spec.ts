import { TestBed } from '@angular/core/testing';

import { ManageCrisisService } from './manage-crisis.service';

describe('ManageCrisisService', () => {
  let service: ManageCrisisService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ManageCrisisService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
