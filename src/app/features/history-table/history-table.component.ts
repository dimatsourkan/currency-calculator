import {
  Component,
  OnInit,
} from "@angular/core";
import { MatTableDataSource } from "@angular/material/table";
import { HistoryTableStateService } from "./history-table-state.service";

@Component({
  selector: "app-history-table",
  templateUrl: "./history-table.component.html",
  styleUrls: [ "./history-table.component.scss" ],
  providers: [
    HistoryTableStateService,
  ],
})
export class HistoryTableComponent implements OnInit {

  public dataSource = new MatTableDataSource();
  public displayedColumns = [ "date", "currency", "amount", "targetCurrency", "targetAmount" ];

  constructor(
    private historyTableStateService: HistoryTableStateService,
  ) {
  }

  public ngOnInit(): void {
    this.historyTableStateService.loadHistory().subscribe();
    this.historyTableStateService.history$.subscribe(data => {
      this.dataSource.data = data;
      this.dataSource.connect();
    });
  }

}
