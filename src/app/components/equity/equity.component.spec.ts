import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { EquityComponent } from './equity.component';
import { ExchangePipeArgs } from '../../pipes/exchange.pipe';
import { EquityModel } from '../../models/equity.model';
import { Injectable, Pipe, PipeTransform } from '@angular/core';
import { ID_PROVIDER_TOKEN } from '../../providers/id/id.provider';

@Pipe({
  name: 'exchange',
  pure: false
})
class ExchangePipe implements PipeTransform {
  transform(value: number, { from, to }: ExchangePipeArgs) {
    return 0.1 * value;
  }
}

@Injectable()
class EquityService {
  equities: [
    {
      id: '1',
      amount: 1,
      currency: 'BTC',
    },
    {
      id: '2',
      amount: 1,
      currency: 'XRP',
    },
    {
      id: '3',
      amount: 1,
      currency: 'ETH',
    }
  ];

  remove(id) {
    const index = this.equities.findIndex((equity: EquityModel) => (equity.id === id));
    if (index > -1) {
      this.equities.splice(index, 1);
    }
  }
}

describe('EquityComponent', () => {
  let component: EquityComponent;
  let fixture: ComponentFixture<EquityComponent>;

  beforeEach(async(() => {
    const equityServiceSpy = jasmine.createSpyObj('EquityService', {
      equities: [
        {
          id: '1',
          amount: 1,
          currency: 'BTC',
        },
        {
          id: '2',
          amount: 1,
          currency: 'XRP',
        },
        {
          id: '3',
          amount: 1,
          currency: 'ETH',
        },
      ],
      remove(id) {
        const index = this.equities.findIndex((equity: EquityModel) => (equity.id === id));
        if (index > -1) {
          this.equities.splice(index, 1);
        }
      },
    });
    TestBed.configureTestingModule({
      declarations: [ EquityComponent, ExchangePipe ],
      providers: [
        { provide: EquityService, useValue: equityServiceSpy },
        { provide: ID_PROVIDER_TOKEN, useValue: () => '123' }
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
});
