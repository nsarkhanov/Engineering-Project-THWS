import { Injectable, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Subject, from } from  'rxjs';
import { io, Socket } from "socket.io-client";
import { DataPoint } from 'DataPoint';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  
  private baseUrl =  'http://localhost:3000';
  constructor(private httpClient: HttpClient) { 
  }

  getInitialData() {
    return this.httpClient.get<DataPoint[]>(`${this.baseUrl}/api/data`);
  }

  getUpdates() {
    let socket = io(this.baseUrl);
    let dataSub = new Subject<DataPoint[]>();
    let dataSubObservable = from(dataSub);

    socket.on('data', (data: DataPoint[]) => {
      dataSub.next(data);
    });

    return dataSubObservable;
  }
}
