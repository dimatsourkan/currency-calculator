import { Injectable } from "@angular/core";
import {
  HistoryClient,
  HistoryModel,
} from "@http-clients";
import {
  BehaviorSubject,
  finalize,
  Observable,
  tap,
} from "rxjs";

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
