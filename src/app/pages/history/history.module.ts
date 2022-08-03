import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HistoryTableModule } from "../../features/history-table/history-table.module";

import { HistoryRoutingModule } from './history-routing.module';
import { HistoryComponent } from './history.component';


@NgModule({
  declarations: [
    HistoryComponent
  ],
  imports: [
    CommonModule,
    HistoryTableModule,
    HistoryRoutingModule
  ]
})
export class HistoryModule { }
