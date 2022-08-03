import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { SharedModule } from "../../shared/shared.module";
import { HistoryTableComponent } from "./history-table.component";

@NgModule({
  declarations: [
    HistoryTableComponent,
  ],
  exports: [
    HistoryTableComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
  ],
})
export class HistoryTableModule {}
