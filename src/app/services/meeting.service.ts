import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MeetingService {
  private meetingId: string = ''
  private password: string = ''

  constructor() { }


  setMeetingDetails(meetingId:string, password:string){
    this.meetingId = meetingId,
    this.password = password
  }


  getMeetingDetails(){
    return {
     meetingId: this.meetingId,
     password :this.password
    }
  }
}
