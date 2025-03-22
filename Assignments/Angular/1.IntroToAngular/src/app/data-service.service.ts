import { data } from 'react-router-dom';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataServiceService {
  private dataSubject = new BehaviorSubject<string>('Initial data');
  currentData = this.dataSubject.asObservable();

  changeData(newData: string) {
    this.dataSubject.next(newData);
  }
}
