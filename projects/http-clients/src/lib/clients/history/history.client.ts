import { Injectable } from "@angular/core";
import {
  Observable,
  of,
  take,
  tap,
} from "rxjs";
import { HistoryModel } from "../../models/history.model";

const STORE_KEY = "history_data";

@Injectable()
export class HistoryClient {

  public list(): Observable<HistoryModel[]> {
    return of<HistoryModel[]>(this.getFromStorage()).pipe(take(1));
  }

  public add(data: HistoryModel): Observable<boolean> {
    return of<boolean>(true).pipe(
      take(1),
      tap(() => this.updateHistoryList(data))
    );
  }

  private updateHistoryList(data: HistoryModel): void {
    const historyList = this.getFromStorage();
    historyList.unshift(data);
    if (historyList.length > 10) {
      historyList.splice(historyList.length - 1, 1);
    }
    this.setJSON(historyList);
  }

  private getFromStorage(): HistoryModel[] {
    return this.getJson() || [];
  }

  private getJson(): any {
    try {
      return JSON.parse(localStorage.getItem(STORE_KEY) || "");
    } catch (err) {
      return null;
    }
  }

  private setJSON(data: any): void {
    localStorage.setItem(STORE_KEY, JSON.stringify(data));
  }

}
