import { Injectable } from "@angular/core";
import {
  combineLatest,
  debounceTime,
  filter,
  Observable,
  startWith,
  switchMap,
} from "rxjs";
import { HistoryClient } from "../../../../projects/http-clients/src/lib/clients/index";
import { CurrencyCalculatorFormService } from "./currency-calculator-form.service";
import { CurrencyCalculatorStateService } from "./currency-calculator-state.service";

@Injectable()
export class CurrencyCalculatorService {

  constructor(
    private ccFormService: CurrencyCalculatorFormService,
    private ccStateService: CurrencyCalculatorStateService,
    private historyClient: HistoryClient,
  ) {
  }

  public initCalculator(): void {
    this.listenValueChanges();
    this.loadCurrencies().subscribe();
  }

  private get rate(): number | null {
    const rateCode = this.ccFormService.currencyControl?.value;
    return this.ccStateService.getCurrencyByCode(rateCode)?.rate || null;
  }

  private get targetRate(): number | null {
    const targetRateCode = this.ccFormService.targetCurrencyControl?.value;
    return this.ccStateService.getCurrencyByCode(targetRateCode)?.rate || null;
  }

  private listenValueChanges(): void {
    combineLatest([
      this.ccFormService.amountControl?.valueChanges.pipe(startWith(0)),
      this.ccFormService.currencyControl?.valueChanges.pipe(startWith(0)),
      this.ccFormService.targetCurrencyControl?.valueChanges.pipe(startWith(0)),
    ]).subscribe(() => this.calculateOnMainChanges());

    this.ccFormService.targetAmountControl?.valueChanges
      .subscribe(() => this.calculateOnTargetChanges());

    this.ccFormService.dateControl?.valueChanges
      .pipe(switchMap(() => this.loadCurrencies()))
      .subscribe(() => this.calculateOnMainChanges());

    this.ccFormService.form?.valueChanges
      .pipe(
        debounceTime(500),
        filter(() => this.ccFormService.form.valid),
        switchMap((val) => this.historyClient.add(val)),
      )
      .subscribe();
  }

  private calculateOnMainChanges(): void {
    const amount = this.ccFormService.amountControl?.value;
    const canBeCalculated = amount && this.rate && this.targetRate;
    if (canBeCalculated) {
      amount
        ? this.patchTargetAmount()
        : this.patchAmount();
    }
  }

  private calculateOnTargetChanges(): void {
    const amount = this.ccFormService.targetAmountControl?.value;
    const canBeCalculated = amount && this.rate && this.targetRate;

    if (canBeCalculated) {
      amount
        ? this.patchAmount()
        : this.patchTargetAmount();
    }
  }

  private patchAmount(): void {
    const amount = this.calculateAmount();
    this.ccFormService.amountControl?.patchValue(amount, {
      emitEvent: false,
    });
  }

  private patchTargetAmount(): void {
    const amount = this.calculateTargetAmount();
    this.ccFormService.targetAmountControl?.patchValue(amount, {
        emitEvent: false,
      });
  }

  private calculateAmount(): number | null {
    const targetAmount = this.ccFormService.targetAmountControl?.value;
    const rate = this.rate;
    const targetRate = this.targetRate;

    return rate && targetAmount && targetRate
      ? this.toFixed(targetRate * targetAmount / rate, 3)
      : null;
  }

  private calculateTargetAmount(): number | null {
    const rate = this.rate;
    const targetRate = this.targetRate;
    const amount = this.ccFormService.amountControl?.value;

    return rate && amount && targetRate
      ? this.toFixed(rate * amount / targetRate, 3)
      : null;
  }

  private loadCurrencies(): Observable<any> {
    const date = this.ccFormService.dateControl?.value;
    return this.ccStateService
      .loadCurrenciesByDate(date);
  }

  //TODO - This method can be moved to clear function
  private toFixed(num: number, count: number): number {
    return parseFloat(num?.toFixed(count) || "");
  }
}
