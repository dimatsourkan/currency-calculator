import { Injectable } from "@angular/core";
import {
  BehaviorSubject,
  finalize,
  Observable,
  tap,
} from "rxjs";
import { HistoryClient } from "../../../../projects/http-clients/src/lib/clients/index";
import { HistoryModel } from "../../../../projects/http-clients/src/lib/models/history.model";

@Injectable()
export class HistoryTableStateService {

  private history = new BehaviorSubject<HistoryModel[]>([]);
  public history$ = this.history.asObservable();

  private loading = new BehaviorSubject<boolean>(false);
  public loading$ = this.loading.asObservable();

  constructor(
    private historyClient: HistoryClient,
  ) {
  }

  public loadHistory(): Observable<HistoryModel[]> {
    this.loading.next(true);
    return this.historyClient.list()
      .pipe(
        finalize(() => this.loading.next(false)),
        tap((data) => this.history.next(data)),
      );
  }

}
