import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { SharedModule } from "../../shared/shared.module";
import { CurrencyCalculatorComponent } from "./currency-calculator.component";

@NgModule({
  declarations: [
    CurrencyCalculatorComponent,
  ],
  exports: [
    CurrencyCalculatorComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
  ],
})
export class CurrencyCalculatorModule {}
