import { Component } from '@angular/core';
import { ProgressService } from '../../providers/progress/progress.service';
import { ReplaySubject } from 'rxjs';

@Component({
  selector: 'app-progress',
  template: `
    <div
      [ngClass]="(active$ | async) ? 'progress-bar progress-bar-striped bg-warning progress-bar-animated position-sticky' : ''"
      style="height: 5px;"
    >
      <div
        class="progress-bar"
        role="progressbar"
        style="width: 100%"
        aria-valuenow="100%"
        aria-valuemin="0"
        aria-valuemax="100"
      ></div>
    </div>
  `,
})
export class ProgressComponent {
  constructor(
    private progress: ProgressService,
  ) {}

  get active$(): ReplaySubject<boolean> {
    return this.progress.active$;
  }
}

