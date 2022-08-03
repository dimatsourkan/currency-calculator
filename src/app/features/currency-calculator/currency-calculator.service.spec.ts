import { TestBed } from '@angular/core/testing';

import { CurrencyCalculatorStateService } from './currency-calculator-state.service';

describe('CurrencyCalculatorService', () => {
  let service: CurrencyCalculatorStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CurrencyCalculatorStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
