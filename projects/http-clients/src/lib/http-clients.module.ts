import { HttpClientModule } from "@angular/common/http";
import {
  ModuleWithProviders,
  NgModule,
} from "@angular/core";
import {
  CurrencyClient,
  HistoryClient,
} from "./clients";
import { HttpClientsConfig } from "./http-clients.config";
import {
  API_URL,
  CURRENCY_API_URL,
} from "./http-clients.environement";

@NgModule({
  declarations: [],
  imports: [
    HttpClientModule,
  ],
  exports: [],
})
export class HttpClientsModule {
  static forRoot(config: HttpClientsConfig): ModuleWithProviders<HttpClientsModule> {
    return {
      ngModule: HttpClientsModule,
      providers: [
        { provide: API_URL, useValue: config.apiUrl },
        { provide: CURRENCY_API_URL, useValue: config.currencyApiUrl },
        CurrencyClient,
        HistoryClient,
      ],
    };
  }
}
