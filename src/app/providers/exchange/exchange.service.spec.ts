import { TestBed } from '@angular/core/testing';
import { ExchangeService } from './exchange.service';
import { HttpClient } from '@angular/common/http';

describe('ExchangeService', () => {
  beforeEach(() => {
    const httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    TestBed.configureTestingModule({
      providers: [
        ExchangeService,
        { provide: HttpClient, useValue: httpClientSpy },
      ],
    });
  });

  it('should be created', () => {
    const service: ExchangeService = TestBed.get(ExchangeService);
    expect(service).toBeTruthy();
  });
});
