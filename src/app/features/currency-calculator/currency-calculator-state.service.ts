import { Injectable } from "@angular/core";
import {
  CurrencyClient,
  CurrencyModel,
} from "@http-clients";
import {
  BehaviorSubject,
  finalize,
  Observable,
  of,
  take,
  tap,
} from "rxjs";

@Injectable()
export class CurrencyCalculatorStateService {

  private currencies = new BehaviorSubject<CurrencyModel[]>([]);
  public currencies$ = this.currencies.asObservable();

  private loading = new BehaviorSubject<boolean>(false);
  public loading$ = this.loading.asObservable();

  constructor(
    private currencyClient: CurrencyClient,
  ) {
  }

  public loadCurrenciesByDate(date: Date): Observable<CurrencyModel[]> {

    if (!date) {
      return of([]).pipe(take(1));
    }

    this.loading.next(true);
    return this.currencyClient.list(date)
      .pipe(
        finalize(() => this.loading.next(false)),
        tap((data) => this.currencies.next(data)),
      );
  }

  public getCurrencyByCode(code: string): CurrencyModel | null {
    return this.currencies.value?.find(c => c.cc === code) || null;
  }
}
