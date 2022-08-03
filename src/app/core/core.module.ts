import { CommonModule } from "@angular/common";
import {
  NgModule,
  Optional,
  SkipSelf,
} from "@angular/core";
import { HttpClientsModule } from "@http-clients";
import { environment } from "../../environments/environment";

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientsModule.forRoot({
      apiUrl: environment.apiUrl,
      currencyApiUrl: environment.currencyApi,
    }),
  ],
})
export class CoreModule {

  public constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error(`CoreModule has already been loaded. Import CoreModule in the AppModule only.`);
    }
  }

}
