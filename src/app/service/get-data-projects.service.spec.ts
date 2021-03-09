import { TestBed } from '@angular/core/testing';

import { GetDataProjectsService } from './get-data-projects.service';

describe('GetDataProjectsService', () => {
  let service: GetDataProjectsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetDataProjectsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
