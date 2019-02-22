import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { InputComponent } from './input.component';
import { ID_PROVIDER_TOKEN } from '../../providers/id/id.provider';

describe('InputComponent', () => {
  let component: InputComponent;
  let fixture: ComponentFixture<InputComponent>;
  let node: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InputComponent ],
      imports: [
        ReactiveFormsModule,
      ],
      providers: [
        { provide: ID_PROVIDER_TOKEN, useValue: () => '123' },
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

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
