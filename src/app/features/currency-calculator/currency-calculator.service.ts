import {
  Injectable,
  OnDestroy,
} from "@angular/core";
import { HistoryClient } from "@http-clients";
import {
  combineLatest,
  debounceTime,
  filter,
  Observable,
  startWith,
  Subject,
  switchMap,
  takeUntil,
} from "rxjs";
import { CurrencyCalculatorFormService } from "./currency-calculator-form.service";
import { CurrencyCalculatorStateService } from "./currency-calculator-state.service";

@Injectable()
export class CurrencyCalculatorService implements OnDestroy {

  private destroy = new Subject();

  constructor(
    private ccFormService: CurrencyCalculatorFormService,
    private ccStateService: CurrencyCalculatorStateService,
    private historyClient: HistoryClient,
  ) {
  }

  public ngOnDestroy(): void {
    this.destroy.next(null);
    this.destroy.complete();
  }

  public initCalculator(): void {
    this.listenValueChanges();
    this.loadCurrencies()
      .pipe(takeUntil(this.destroy))
      .subscribe();
  }

  private get amount(): number | null {
    return this.ccFormService.amountControl?.value;
  }

  private get targetAmount(): number | null {
    return this.ccFormService.targetAmountControl?.value;
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
    ])
      .pipe(takeUntil(this.destroy))
      .subscribe(() => this.calculateOnMainChanges());

    this.ccFormService.targetAmountControl?.valueChanges
      .pipe(takeUntil(this.destroy))
      .subscribe(() => this.calculateOnTargetChanges());

    this.ccFormService.dateControl?.valueChanges
      .pipe(
        takeUntil(this.destroy),
        switchMap(() => this.loadCurrencies()),
      )
      .subscribe(() => this.calculateOnMainChanges());

    this.ccFormService.form?.valueChanges
      .pipe(
        takeUntil(this.destroy),
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
    const amount = this.calculateCurrency(this.targetAmount, this.targetRate, this.rate);
    this.ccFormService.amountControl?.patchValue(amount, {
      emitEvent: false,
    });
  }

  private patchTargetAmount(): void {
    const amount = this.calculateCurrency(this.amount, this.rate, this.targetRate);
    this.ccFormService.targetAmountControl?.patchValue(amount, {
      emitEvent: false,
    });
  }

  private loadCurrencies(): Observable<any> {
    const date = this.ccFormService.dateControl?.value;
    return this.ccStateService
      .loadCurrenciesByDate(date);
  }

  //TODO - This method can be moved to clear function
  private calculateCurrency(
    amount: number | null,
    rate: number | null,
    targetRate: number | null,
  ) {
    const canBeCalculated = rate && amount && targetRate;
    return canBeCalculated
      ? this.toFixed(rate * amount / targetRate, 3)
      : null;
  }

  //TODO - This method can be moved to clear function
  private toFixed(num: number, count: number): number {
    return parseFloat(num?.toFixed(count) || "");
  }
}
