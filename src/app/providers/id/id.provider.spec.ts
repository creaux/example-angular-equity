import { TestBed } from '@angular/core/testing';

import { ID_PROVIDER, IdProvider } from './id.provider';

describe('IdProvider', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [IdProvider],
  }));

  it('should be created', () => {
    const service = TestBed.get(IdProvider);
    expect(service).toBeTruthy();
  });
});
