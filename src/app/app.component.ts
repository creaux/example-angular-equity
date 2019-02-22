import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <app-progress></app-progress>
    <br />
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-12 col-sm-12 col-md-10 col-lg-8 col-xl-8">
          <h1 class="h3 text-center">{{ title | uppercase }}!</h1>
          <hr />
          <p class="text-center small">Please choose currency and then fill desired amount and click to add it.</p>
          <br />
          <app-input></app-input>
          <br />
          <p class="text-center small">Following table shows you what you have. You can also delete equity from your portfolio.</p>
          <br />
          <app-equity></app-equity>
          <br />
          <div class="text-center small text-capitalize fixed-bottom" style="margin-bottom: 10px;">Petr Juna, 2019</div>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Bob\'s burgeoning fortune';
}
