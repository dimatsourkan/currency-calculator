import { Injectable } from "@angular/core";
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { futureDateValidator } from "../../shared/validators/future-date.validator";

@Injectable()
export class CurrencyCalculatorFormService {

  private _form = new FormGroup({
    date: new FormControl(new Date(), [ Validators.required, futureDateValidator ]),
    amount: new FormControl(null, [Validators.required]),
    currency: new FormControl(null, [Validators.required]),
    targetAmount: new FormControl(null, [Validators.required]),
    targetCurrency: new FormControl(null, [Validators.required]),
  });

  public get form(): FormGroup {
    return this._form;
  }

  public get dateControl(): AbstractControl | null {
    return this.form.get("date");
  }

  public get amountControl(): AbstractControl | null {
    return this.form.get("amount");
  }

  public get currencyControl(): AbstractControl | null {
    return this.form.get("currency");
  }

  public get targetAmountControl(): AbstractControl | null {
    return this.form.get("targetAmount");
  }

  public get targetCurrencyControl(): AbstractControl | null {
    return this.form.get("targetCurrency");
  }

}
