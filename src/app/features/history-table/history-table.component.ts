import {
  Component,
  OnDestroy,
  OnInit,
} from "@angular/core";
import { MatTableDataSource } from "@angular/material/table";
import {
  Subject,
  takeUntil,
} from "rxjs";
import { HistoryTableStateService } from "./history-table-state.service";

@Component({
  selector: "app-history-table",
  templateUrl: "./history-table.component.html",
  styleUrls: [ "./history-table.component.scss" ],
  providers: [
    HistoryTableStateService,
  ],
})
export class HistoryTableComponent implements OnInit, OnDestroy {

  public dataSource = new MatTableDataSource();
  public displayedColumns = [ "date", "currency", "amount", "targetCurrency", "targetAmount" ];
  private destroy = new Subject();

  constructor(
    private historyTableStateService: HistoryTableStateService,
  ) {
  }

  public ngOnDestroy(): void {
    this.destroy.next(null);
    this.destroy.complete();
  }

  public ngOnInit(): void {
    this.historyTableStateService.loadHistory()
      .pipe(takeUntil(this.destroy))
      .subscribe();
    this.historyTableStateService.history$
      .pipe(takeUntil(this.destroy))
      .subscribe(data => {
        this.dataSource.data = data;
        this.dataSource.connect();
      });
  }

}
