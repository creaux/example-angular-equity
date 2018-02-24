import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { Component } from '@angular/core';
import { ProgressComponent } from './components/progress/progress.component';

@Component({
  selector: 'app-input',
  template: '',
})
class InputComponent {}

@Component({
  selector: 'app-equity',
  template: '',
})
class EquityComponent {}

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        InputComponent,
        EquityComponent,
        ProgressComponent,
      ],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'bobs-burgeoning-fortune'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('Bob\'s burgeoning fortune');
  });
});
