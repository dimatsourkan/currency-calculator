import { TestBed } from '@angular/core/testing';

import { HistoryClient } from './history.client';

describe('HistoryClient', () => {
  let service: HistoryClient;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HistoryClient);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
