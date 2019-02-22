import { TestBed } from '@angular/core/testing';

import { CurrencyService } from './currency.service';

describe('CurrencyService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CurrencyService = TestBed.get(CurrencyService);
    expect(service).toBeTruthy();
  });

  it('should contain list of currencies', () => {
    const service: CurrencyService = TestBed.get(CurrencyService);
    const currencies = [
      {
        code: 'BTC',
        name: 'Bitcoin',
      },
      {
        code: 'ETH',
        name: 'Etherium',
      },
      {
        code: 'XRP',
        name: 'Ripple'
      }
    ];
    expect(service.currencies).toEqual(currencies);
  });
});
