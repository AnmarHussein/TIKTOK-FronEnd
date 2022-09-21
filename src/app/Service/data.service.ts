import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  userId: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  private dataShearCom = new BehaviorSubject('');
  currentApprovalStageMessage = this.dataShearCom.asObservable();
  _anyData!: any;
  _anyData1!: any;
  set anyData(value: any) {
    this._anyData = value;
  }
  get anyData(): any {
    return this._anyData;
  }

  set anyData1(value: any) {
    this._anyData1 = value;
  }
  get anyData1(): any {
    return this._anyData1;
  }
  updateApprovalMessage(message: string) {
    this.dataShearCom.next(message);
  }
}
