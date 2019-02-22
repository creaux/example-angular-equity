import { Pipe, PipeTransform } from '@angular/core';
import { ExchangeService } from '../providers/exchange/exchange.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ExchangeModel } from '../models/exchange.model';

export interface ExchangePipeArgs {
  from: string;
  to: string;
}

@Pipe({
  name: 'exchange',
  pure: false
})
export class ExchangePipe implements PipeTransform {
  cachedRate;

  constructor(
    private exchange: ExchangeService,
  ) {}

  transform(value: number, { from, to }: ExchangePipeArgs): Observable<number> {
    return this.exchange.getRate$(from, to)
      .pipe(map<ExchangeModel, number>((data: ExchangeModel) => data[to] * value));
  }
}
