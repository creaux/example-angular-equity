import { TestBed } from '@angular/core/testing';
import { ExchangeService } from './exchange.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { of } from 'rxjs';
import { ProgressService } from '../progress/progress.service';

describe('ExchangeService', () => {
  let httpClientSpy;
  let progressServiceSpy;
  let getResult = of(true);

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', {
      get: getResult,
    });
    progressServiceSpy = jasmine.createSpyObj('ProgressService', ['active']);
    TestBed.configureTestingModule({
      providers: [
        ExchangeService,
        { provide: HttpClient, useValue: httpClientSpy },
        { provide: ProgressService, useValue: progressServiceSpy },
      ],
    });
  });

  it('should be created', () => {
    const service: ExchangeService = TestBed.get(ExchangeService);
    expect(service).toBeTruthy();
  });

  it('should call get request with required url and params', (done) => {
    const from = 'XTC';
    const to = 'EUR';
    const service: ExchangeService = TestBed.get(ExchangeService);
    const params = new HttpParams()
      .set('fsym', from)
      .set('tsyms', to);
    service.getRate$(from, to).subscribe(() => {
      expect(progressServiceSpy.active).toHaveBeenCalledWith(false);
      done();
    });
    expect(httpClientSpy.get).toHaveBeenCalledWith('https://min-api.cryptocompare.com/data/price', { params });
  });
});
