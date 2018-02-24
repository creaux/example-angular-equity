import { ExchangePipe } from './exchange.pipe';
import { inject, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { ExchangeService } from '../providers/exchange/exchange.service';

describe('ExchangePipe', () => {
  let exchangeServiceSpy;

  beforeEach(() => {
    exchangeServiceSpy = jasmine.createSpyObj('ExchangeService', {
      getRate$: of({ EUR: '0.1' }),
    });
    TestBed.configureTestingModule({
      declarations: [ ExchangePipe ],
      providers: [{ provide: ExchangeService, useValue: exchangeServiceSpy }],
    });
  });

  it('create an instance', inject([ExchangeService], exchangeService => {
    const pipe = new ExchangePipe(exchangeService);
    expect(pipe).toBeTruthy();
  }));

  it('should call exchange rate method with from / to and value', inject([ExchangeService], exchangeService => {
    const pipe = new ExchangePipe(exchangeService);
    pipe.transform(1, { from: 'BTC', to: 'EUR' });
    expect(exchangeService.getRate$).toHaveBeenCalledWith('BTC', 'EUR');
  }));

  it('should be able to convert value from / to amount in currency', (done) => {
    const exchangeService = TestBed.get(ExchangeService);
    const pipe = new ExchangePipe(exchangeService);
    pipe.transform(1, { from: 'BTC', to: 'EUR' }).subscribe((result) => {
      expect(result).toEqual(0.1);
      done();
    });
  });
});
