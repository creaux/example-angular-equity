import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { InputComponent } from './input.component';
import { EquityService } from '../../providers/equity/equity.service';
import { CurrencyService } from '../../providers/currency/currency.service';

describe('InputComponent', () => {
  let component: InputComponent;
  let fixture: ComponentFixture<InputComponent>;
  let node: HTMLElement;
  let equityService: { add: void };


  beforeEach(async(() => {
    equityService = jasmine.createSpyObj('EquityService', ['add']);
    TestBed.configureTestingModule({
      declarations: [ InputComponent ],
      imports: [
        ReactiveFormsModule,
      ],
      providers: [
        { provide: EquityService, useValue: equityService },
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    node = fixture.debugElement.nativeElement;
  });

  afterEach(() => {
    component.form.reset();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form with empty values', () => {
    expect(component.form.controls.currency.value).toEqual('');
    expect(component.form.controls.amount.value).toEqual('');
  });

  it('should be possible to get currencies', () => {
    const currencies = [
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
    expect(component.currencies).toEqual(currencies);
  });

  it('should be possible to submit form', () => {
    const equity = TestBed.get(EquityService);
    component.form.controls.currency.setValue('XTC');
    component.form.controls.amount.setValue('100');
    expect(component.form.controls.currency.value).toEqual('XTC');
    expect(component.form.controls.amount.value).toEqual('100');
    component.submit();
    expect(equity.add).toHaveBeenCalled();
    expect(component.form.controls.currency.value).toEqual(null);
    expect(component.form.controls.amount.value).toEqual(null);
  });

  describe('form', () => {
    it('should be invalid when empty', () => {
      expect(component.form.valid).toBe(false);
    });

    it('should be invalid when only currency is filled', () => {
      component.form.controls.currency.setValue('XTC');
      expect(component.form.valid).toBe(false);
    });

    it('should be invalid when only amount is filled', () => {
      component.form.controls.amount.setValue(100);
      expect(component.form.valid).toBe(false);
    });

    it('should be valid when both fields are valid', () => {
      component.form.controls.amount.setValue(100);
      component.form.controls.currency.setValue('XTC');
      expect(component.form.valid).toBe(true);
    });
  });
  describe('fields', () => {
    it('should have amount field valid only when it is number', () => {
      component.form.controls.amount.setValue('a');
      expect(component.form.controls.amount.valid).toBe(false);
      component.form.controls.amount.setValue('#');
      expect(component.form.controls.amount.valid).toBe(false);
      component.form.controls.amount.setValue(1);
      expect(component.form.controls.amount.valid).toBe(true);
    });

    it('should have currency field valid only when it is string', () => {
      component.form.controls.currency.setValue('a');
      expect(component.form.controls.amount.valid).toBe(false);
      component.form.controls.currency.setValue(1);
      expect(component.form.controls.amount.valid).toBe(false);
    });
  });
});
