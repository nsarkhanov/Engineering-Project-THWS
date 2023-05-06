import { Injectable } from '@angular/core';
import {Observable, Subject} from 'rxjs' 
import { MarketPrice } from '../market-price';

@Injectable({
  providedIn: 'root'
})
export class LiveService {
  private displayGraph: number = 1;
  private showAddTask: boolean = false;
  private marketStatusToPlot: MarketPrice[];
  private graphSubject = new Subject<any>();
  private titleSubject = new Subject<any>();
  private curTitle: string = "Brain wave sensor";
  private allTitles = ["Muse sensor", "Heart rate sensor", "IMU sensor", "Skin Sensor"];

  private subject = new Subject<any>();
  constructor() { }

  changeDisplayGraph(i : number) {
    this.displayGraph = i;
    this.curTitle = this.allTitles[i-1];
    this.titleSubject.next(this.curTitle);
    this.graphSubject.next(this.displayGraph);
    return this.curTitle;
  }

  /**
   * If start is 0, we changed start time. If it is 1, we changed end time
   * @param start 
   * @param time 
   * @returns 
   */
  changeDisplayTime(start: number, time) {
    let timeStr = start == 0 ? "Start time" : "End time";
    console.log("This is from the Live Service! " + timeStr +" is " + time);
  }

  getCurrentTitle() {
    return this.curTitle;
  }

  getCurrentDisplayGraph(){
    return this.displayGraph;
  }

  toggleAddTask(): void {
    this.showAddTask = !this.showAddTask;
    this.subject.next(this.showAddTask);
  }

  onGraphChange(): Observable<any> {
    return this.graphSubject.asObservable();
  }

  onTitleChange(): Observable<any> {
    return this.titleSubject.asObservable();
  }

  onToggle(): Observable<any> {
    return this.subject.asObservable();
  }

  setMarketStatusToPlot(market: MarketPrice[]) {
    this.marketStatusToPlot = market;
  }

  getMarketStatusToPlot() {
    return this.marketStatusToPlot;
  }
}
