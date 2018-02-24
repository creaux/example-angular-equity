import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Component } from '@angular/core';
import { EquityService } from '../../providers/equity/equity.service';
import { CurrencyService } from '../../providers/currency/currency.service';
import { CurrencyModel } from '../../models/currency.model';

interface InputFormGroup extends FormGroup {
  controls: {
    [key: string]: AbstractControl;
    currency?: AbstractControl;
    amount?: AbstractControl;
  };
}

@Component({
  selector: 'app-input',
  template: `
    <form
      class="input-group"
      [formGroup]="form"
      (ngSubmit)="submit()"
      [ngClass]="form.touched && form.valid ? 'was-validated' : undefined"
    >
      <div class="input-group-prepend">
        <select
          formControlName="currency"
          class="form-control custom-select"
          [ngClass]="form.controls.currency.invalid && form.controls.currency.dirty ? 'is-invalid' : undefined"
        >
          <option value="" selected disabled>Currency...</option>
          <option *ngFor="let currency of currencies" [ngValue]="currency.code">{{ currency.name }}</option>
        </select>
      </div>
      <input
        formControlName="amount"
        type="number"
        class="form-control"
        aria-label="Text input with dropdown button"
        [ngClass]="form.controls.amount.invalid && form.controls.amount.dirty ? 'is-invalid' : undefined"
      >
      <div class="input-group-append">
        <button
          class="btn btn-primary"
          type="submit"
          aria-haspopup="false"
          aria-expanded="false"
          [disabled]="form.invalid"
        >
          Add
        </button>
      </div>
    </form>
  `,
  styleUrls: ['./input.component.scss']
})
export class InputComponent {
  form: InputFormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private equityService: EquityService,
    private currenciesService: CurrencyService,
  ) {
    const controls = {
      currency: ['', Validators.compose([
        Validators.required,
        Validators.minLength(3),
      ])],
      amount: ['', Validators.compose([
        Validators.required,
        Validators.pattern(/^[0-9]*$/)
      ])],
    };

    this.form = this.formBuilder.group(controls);
  }

  get currencies(): CurrencyModel[] {
    return this.currenciesService.currencies;
  }

  submit() {
    this.equityService.add(this.form.value);
    this.form.reset();
  }
}
