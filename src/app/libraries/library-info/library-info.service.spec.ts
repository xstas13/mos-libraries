import { TestBed } from '@angular/core/testing';

import { LibraryInfoService } from './library-info.service';

describe('LibraryInfoService', () => {
  let service: LibraryInfoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LibraryInfoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
