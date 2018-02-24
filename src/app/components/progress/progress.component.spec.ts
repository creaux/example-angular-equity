import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ProgressComponent } from './progress.component';
import { ProgressService } from '../../providers/progress/progress.service';
import { ReplaySubject } from 'rxjs';

describe('ProgressComponent', () => {
  let component: ProgressComponent;
  let fixture: ComponentFixture<ProgressComponent>;
  let progressService;

  beforeEach(async(() => {
    const active$ = new ReplaySubject(1);
    active$.next(true);
    progressService = {
      get active$() {
        return active$;
      },
    };
    TestBed.configureTestingModule({
      declarations: [ ProgressComponent ],
      providers: [{ provide: ProgressService, useValue: progressService }],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return active$ from service', (done) => {
    component.active$.subscribe((data) => {
      expect(data).toEqual(true);
      done();
    });
  });
});
