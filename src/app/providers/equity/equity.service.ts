import { Inject, Injectable } from '@angular/core';
import { EquityModel } from '../../models/equity.model';
import { ID_PROVIDER_TOKEN } from '../id/id.provider';
import { ExchangeService } from '../exchange/exchange.service';
import { flatMap, map, tap, scan } from 'rxjs/operators';
import { ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EquityService {
  public equities$: ReplaySubject<EquityModel>;

  constructor(
    @Inject(ID_PROVIDER_TOKEN) private id: () => string,
    private exchange: ExchangeService,
  ) {
    this.equities$ = new ReplaySubject<EquityModel>();
  }

  add(investment: EquityModel): void {
    this.equities$.next({ ...investment, id: this.id() });
  }

  remove(id: string) {
    const new$ = new ReplaySubject<EquityModel>();
    this.equities$.subscribe((equity) => {
      if (equity.id !== id) {
        new$.next(equity);
      }
    });
    this.equities$ = new$;
  }

  total$(to) {
    return this.equities$
      .pipe(flatMap(this.change$(to)))
      .pipe(scan((acc, next) => acc + next));
  }

  private change$ = (to) => (equity: EquityModel) => (
    this.exchange.getRate$(equity.currency, to)
      .pipe(map((rate) => (rate[to] * equity.amount)))
  )
}
