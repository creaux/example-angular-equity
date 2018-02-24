import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { EquityComponent } from './equity.component';
import { ExchangePipeArgs } from '../../pipes/exchange.pipe';
import { EquityModel } from '../../models/equity.model';
import { Pipe, PipeTransform } from '@angular/core';
import { ID_PROVIDER_TOKEN } from '../../providers/id/id.provider';
import { EquityService } from '../../providers/equity/equity.service';
import { of, ReplaySubject } from 'rxjs';
import { ExchangePipe } from '../../pipes/exchange.pipe';
import { ExchangeService } from '../../providers/exchange/exchange.service';

describe('EquityComponent', () => {
  let component: EquityComponent;
  let fixture: ComponentFixture<EquityComponent>;
  let equities: Array<EquityModel>;
  let equities$: ReplaySubject<EquityModel>;
  let equityServiceSpy;
  let exchangeServiceSpy;

  beforeEach(async(() => {
    equities = [
      {
        id: '123',
        amount: 1,
        currency: 'BTC',
      },
      {
        id: '123',
        amount: 1,
        currency: 'XRP',
      },
      {
        id: '123',
        amount: 1,
        currency: 'ETH',
      },
    ];
    equities$ = new ReplaySubject<EquityModel>();
    equities$.next(equities[0]);
    equities$.next(equities[1]);
    equities$.next(equities[2]);
    equityServiceSpy = jasmine.createSpyObj('EquityService', ['add', 'remove']);
    equityServiceSpy.total$ = () => of(1);
    equityServiceSpy.equities$ = equities$;
    exchangeServiceSpy = jasmine.createSpyObj('ExchangeService', ['getRate$']);
    exchangeServiceSpy.getRate$ = () => of({ EUR: 10 });
    TestBed.configureTestingModule({
      declarations: [ EquityComponent, ExchangePipe ],
      providers: [
        { provide: EquityService, useValue: equityServiceSpy },
        { provide: ExchangeService, useValue: exchangeServiceSpy },
        { provide: ID_PROVIDER_TOKEN, useValue: () => '123' },
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EquityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call add from service three times', () => {
    expect(equityServiceSpy.add).toHaveBeenCalledTimes(3);
    expect(equityServiceSpy.add).toHaveBeenCalledWith(equities[0]);
    expect(equityServiceSpy.add).toHaveBeenCalledWith(equities[1]);
    expect(equityServiceSpy.add).toHaveBeenCalledWith(equities[2]);
  });

  it('should call subscribe as callback and fill equities', (done) => {
    equities$.subscribe(() => {
      expect(component.equities).toEqual(equities);
      done();
    });
  });

  it('should set equities on empty array when unsubscribed', () => {
    component.unsubscribe();
    expect(component.equities).toEqual([]);
  });

  it('should contain equities$', () => {
    let i = 0;
    component.equities$.subscribe((equity) => {
      expect(equity).toEqual(equities[i]);
      i++;
    });
  });

  it('should contain total$', (done) => {
    component.total$.subscribe((data) => {
      expect(data).toEqual(1);
      done();
    });
  });

  it('should call service.remove on remove', () => {
    component.remove(456);
    expect(equityServiceSpy.remove).toHaveBeenCalledWith(456);
  });
});
