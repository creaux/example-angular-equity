import { TestBed } from '@angular/core/testing';
import { EquityService } from './equity.service';
import { ID_PROVIDER_TOKEN } from '../id/id.provider';
import { HttpClient } from '@angular/common/http';

describe('EquityService', () => {
  let httpClientSpy;

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    TestBed.configureTestingModule({
      providers: [
        { provide: ID_PROVIDER_TOKEN, useValue: () => '123' },
        { provide: HttpClient, useValue: httpClientSpy },
      ],
    });
  });

  it('should be created', () => {
    const service: EquityService = TestBed.get(EquityService);
    expect(service).toBeTruthy();
  });
});
