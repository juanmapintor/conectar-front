import { TestBed } from '@angular/core/testing';

import { JSONHelperService } from './jsonhelper.service';

describe('JSONHelperService', () => {
  let service: JSONHelperService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JSONHelperService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
