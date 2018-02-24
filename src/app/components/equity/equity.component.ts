import { Component, Inject, OnInit } from '@angular/core';
import { EquityService } from '../../providers/equity/equity.service';
import { ReplaySubject } from 'rxjs';
import { EquityModel } from '../../models/equity.model';
import { ID_PROVIDER_TOKEN } from '../../providers/id/id.provider';

@Component({
  selector: 'app-equity',
  template: `
    <table class="table table-striped small">
      <thead>
      <tr class="align-middle">
        <th scope="col">ID</th>
        <th scope="col">Currency</th>
        <th scope="col">Amount</th>
        <th scope="col">Exchange</th>
        <th scope="col">Actions</th>
      </tr>
      </thead>
      <tbody>
      <tr *ngIf="equities.length === 0">
        <td colspan="5" class="text-center"><i>You don't have any equity. Add at least one above.</i></td>
      </tr>
      <tr *ngFor="let equity of equities">
        <th scope="row" class="align-middle">{{ equity.id }}</th>
        <td class="align-middle">{{ equity.currency }}</td>
        <td class="align-middle">{{ equity.amount | currency: equity.currency }}</td>
        <td class="align-middle">{{ equity.amount | exchange: { from: equity.currency, to: 'EUR' } | async | currency: 'EUR' }}</td>
        <td class="align-middle">
          <button class="btn-sm btn-block btn-danger" (click)="remove(equity.id)">Delete</button>
        </td>
      </tr>
      <tr *ngIf="equities.length > 1">
        <td colspan="3"><strong>Your total equity is:</strong></td>
        <td colspan="2">{{ total$ | async | currency: 'EUR' }}</td>
      </tr>
      </tbody>
    </table>
  `,
  styleUrls: ['./equity.component.scss']
})
export class EquityComponent implements OnInit {
  public equities: Array<EquityModel> = [];
  private subscription;

  constructor(
    private service: EquityService,
    @Inject(ID_PROVIDER_TOKEN) private id: () => string,
  ) {}

  ngOnInit() {
    // Following data are mocked data and it is presumed
    // that will be loaded for instance from database
    const equities = [
      {
        id: this.id(),
        amount: 1,
        currency: 'BTC',
      },
      {
        id: this.id(),
        amount: 1,
        currency: 'XRP',
      },
      {
        id: this.id(),
        amount: 1,
        currency: 'ETH',
      },
    ];
    this.service.add(equities[0]);
    this.service.add(equities[1]);
    this.service.add(equities[2]);
    this.subscribe();
  }

  public subscribe() {
    this.subscription = this.equities$.subscribe((equity) => {
      this.equities.push(equity);
    });
  }

  public unsubscribe() {
    this.subscription.unsubscribe();
    this.equities = [];
  }

  public get equities$(): ReplaySubject<EquityModel> {
    return this.service.equities$;
  }

  public get total$() {
    return this.service.total$('EUR');
  }

  public remove(id) {
    this.unsubscribe();
    this.service.remove(id);
    this.subscribe();
  }

  // TODO: Test view
}
