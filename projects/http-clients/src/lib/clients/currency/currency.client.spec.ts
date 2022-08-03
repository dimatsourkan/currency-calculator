import { TestBed } from '@angular/core/testing';

import { CurrencyClient } from './currency.client';

describe('CurrencyClient', () => {
  let service: CurrencyClient;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CurrencyClient);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
