import { Injectable } from "@angular/core";
import {
  BehaviorSubject,
  finalize,
  Observable,
  of,
  take,
  tap,
} from "rxjs";
import { CurrencyClient } from "../../../../projects/http-clients/src/lib/clients/index";
import { CurrencyModel } from "../../../../projects/http-clients/src/lib/models/index";

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
