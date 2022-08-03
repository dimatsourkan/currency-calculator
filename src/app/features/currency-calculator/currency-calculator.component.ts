import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
} from "@angular/core";
import { CurrencyCalculatorFormService } from "./currency-calculator-form.service";
import { CurrencyCalculatorStateService } from "./currency-calculator-state.service";
import { CurrencyCalculatorService } from "./currency-calculator.service";

@Component({
  selector: "app-currency-calculator",
  templateUrl: "./currency-calculator.component.html",
  styleUrls: [ "./currency-calculator.component.scss" ],
  providers: [
    CurrencyCalculatorStateService,
    CurrencyCalculatorFormService,
    CurrencyCalculatorService,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CurrencyCalculatorComponent implements OnInit {

  public loading$ = this.ccStateService.loading$;
  public currencies$ = this.ccStateService.currencies$;

  public maxDate = new Date();
  public form = this.ccFormService.form;
  public dateControl = this.ccFormService.dateControl;

  constructor(
    private ccStateService: CurrencyCalculatorStateService,
    private ccFormService: CurrencyCalculatorFormService,
    private ccService: CurrencyCalculatorService,
  ) {
  }

  public ngOnInit(): void {
    this.ccService.initCalculator();
  }

}
