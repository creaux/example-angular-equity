import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProgressService {
  active$: ReplaySubject<boolean>;

  constructor() {
    this.active$ = new ReplaySubject();
    this.active$.next(true);
  }

  active(active: boolean) {
    this.active$.next(active);
  }
}
