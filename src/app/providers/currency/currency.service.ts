import { Injectable } from '@angular/core';
import { CurrencyModel } from '../../models/currency.model';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {
  currencies: CurrencyModel[];

  constructor() {
    this.currencies = [
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
  }
}
