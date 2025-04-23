import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MeetingService {

  constructor() { }
/* 
  private startMeetingSubject = new Subject<void>();

  startMeeting$ = this.startMeetingSubject.asObservable();

  triggerStartMeeting() {
    this.startMeetingSubject.next();
  } */
}

