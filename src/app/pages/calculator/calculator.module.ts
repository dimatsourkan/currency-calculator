import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { CurrencyCalculatorModule } from "../../features/currency-calculator/currency-calculator.module";
import { CalculatorComponent } from "./calculator.component";

@NgModule({
  declarations: [
    CalculatorComponent,
  ],
  imports: [
    CommonModule,
    CurrencyCalculatorModule,
  ],
})
export class CalculatorModule {}
