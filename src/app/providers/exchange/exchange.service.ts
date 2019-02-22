import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { ExchangeModel } from '../../models/exchange.model';
import { finalize, flatMap, tap } from 'rxjs/operators';
import { ProgressService } from '../progress/progress.service';

@Injectable({
  providedIn: 'root'
})
export class  ExchangeService {
  constructor(
    private http: HttpClient,
    private progress: ProgressService,
  ) {}

  getRate$(from, to): Observable<ExchangeModel> {
    const params = new HttpParams()
      .set('fsym', from)
      .set('tsyms', to);
    const options = { params };
    return this.http.get<ExchangeModel>('https://min-api.cryptocompare.com/data/price', options)
      .pipe(tap(() => this.progress.active(false)));
  }
}
