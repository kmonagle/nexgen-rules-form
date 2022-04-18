import { TestBed } from '@angular/core/testing';

import { ThoughtspotService } from './thoughtspot.service';

describe('ThoughtspotService', () => {
  let service: ThoughtspotService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ThoughtspotService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
