import { TestBed } from '@angular/core/testing';

import { NgGxSplitTextService } from './ng-gx-split-text.service';

describe('NgGxSplitTextService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NgGxSplitTextService = TestBed.get(NgGxSplitTextService);
    expect(service).toBeTruthy();
  });
});
