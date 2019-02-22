import { ExchangePipe } from './exchange.pipe';
import { inject, TestBed } from '@angular/core/testing';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable()
class ExchangeService {
  rate() {}
}

describe('ExchangePipe', () => {
  beforeEach(() => {
    const exchangeServiceSpy = jasmine.createSpyObj('ExchangeService', {
      rate: of({ EUR: '0.1' }),
    });
    TestBed.configureTestingModule({
      declarations: [ ExchangePipe ],
      providers: [{
        provide: ExchangeService, useValue: exchangeServiceSpy,
      }],
    });
  });

  it('create an instance', inject([ExchangeService], exchangeService => {
    const pipe = new ExchangePipe(exchangeService);
    expect(pipe).toBeTruthy();
  }));

  it('should call exchange rate method with from / to and value', inject([ExchangeService], exchangeService => {
    const pipe = new ExchangePipe(exchangeService);
    pipe.transform(1, { from: 'BTC', to: 'EUR' });
    expect(exchangeService.rate).toHaveBeenCalledWith('BTC', 'EUR');
  }));

  // it('should be able to convert value from / to amount in currency', (done) => {
  //   inject([ExchangeService], exchangeService => {
  //     const pipe = new ExchangePipe(exchangeService);
  //     const result = pipe.transform(1, { from: 'BTC', to: 'EUR' });
  //     setTimeout(() => {
  //       expect(result).toEqual(0.1);
  //       done();
  //     }, 1000);
  //   });
  // });
});
