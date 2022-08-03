import { HttpClient } from "@angular/common/http";
import {
  Inject,
  Injectable,
} from "@angular/core";
import {
  map,
  Observable,
} from "rxjs";
import { CURRENCY_API_URL } from "../../http-clients.environement";
import { CurrencyModel } from "../../models/index";

@Injectable()
export class CurrencyClient {

  constructor(
    @Inject(CURRENCY_API_URL)
    private apiUrl: string,
    private httpClient: HttpClient,
  ) {
  }

  list(date: Date): Observable<CurrencyModel[]> {
    return this.httpClient
      .get<CurrencyModel[]>(`${ this.apiUrl }/exchange?json`, {
        params: {
          date: this.transformDateToApiFormat(date)
        }
      })
      .pipe(map(data => this.pushUahToList(data)));
  }

  // TODO - This methods can be moved to some clear functions as a helpers
  private transformDateToApiFormat(date: Date): string {
    const year = date.getFullYear();
    // TODO - The month should be increased by 1 because getMonth method counts from 0
    // TODO - Ideally, a library should be used for dates, such as Moment
    const month = this.addLeadingZero(date.getMonth() + 1);
    const day = this.addLeadingZero(date.getDate());
    return `${year}${month}${day}`
  }

  private addLeadingZero(number: number): string {
    return number < 10
      ? `0${number}`
      : `${number}`
  }

  // TODO - I used this method as a hack for API, because NBU API does not return the UAH currency
  private pushUahToList(data: CurrencyModel[]): CurrencyModel[] {
    data.unshift({
      r030: 1,
      txt: "Гривня",
      rate: 1,
      cc: "UAH",
      exchangedate: null,
    })
    return data;
  }
}
