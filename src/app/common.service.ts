import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
// subject-a type of observable,hence must be subscribed to view the data it holds using next() fn
// it emits event after subscription is made
// to emit event of just success/unsuccesful clcik event not the values 

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  // static sendClick(sendClick: any) {
  //   throw new Error('Method not implemented.');
  // }
  private subject = new Subject<any>();

  sendClick() {
    this.subject.next(null);
  }
   // sendclick method from here common service-used in dashboard.ts after imported n injcted in constructor

  getClick(): Observable<any> {
    return this.subject.asObservable();
  }

  constructor() { }
}


