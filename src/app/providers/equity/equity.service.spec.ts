import { TestBed } from '@angular/core/testing';
import { EquityService } from './equity.service';
import { ID_PROVIDER_TOKEN } from '../id/id.provider';

describe('EquityService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      { provide: ID_PROVIDER_TOKEN, useValue: () => '123' }
    ],
  }));

  it('should be created', () => {
    const service: EquityService = TestBed.get(EquityService);
    expect(service).toBeTruthy();
  });
});
