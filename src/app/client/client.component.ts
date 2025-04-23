import { Component, OnInit, Inject, NgZone } from '@angular/core';
 import { HttpClient } from '@angular/common/http';
import { DOCUMENT } from '@angular/common';
import { ZoomService } from '../zoom.service';
import { Router } from '@angular/router';
import { MeetingService } from '../services/meeting.service';
import ZoomMtgEmbedded from '@zoom/meetingsdk/embedded';
@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css'],
  providers: [ZoomService]
})
export class ClientComponent implements OnInit {
  
  meetings:any = []

  meetingData = {
    topic: '',
    type: 2, // Scheduled Meeting by default
    start_time: '',
    duration: 30, // Default 30 minutes
    timezone: '',
    agenda: ''
  };

  constructor (private router:Router,
    public httpClient: HttpClient,
    @Inject(DOCUMENT) document, 
    private ngZone: NgZone,
    private zoomservice:ZoomService,
    private meetingservice:MeetingService
  ) {}
 ngOnInit(): void {
    this.getMeetings()
}

getMeetings(){
 this.zoomservice.getMeeting().subscribe({
   next:(res:any)=>{
     this.meetings = res
     //console.log("meeting details",res.meetingDetails);
     console.log("Meeting details",this.meetings);
     
   }
 })
}

startHostMeeting(meetingId: string, password: string) {
  console.log("meetID",meetingId);
  
  this.meetingservice.setMeetingDetails(meetingId,password)

  this.router.navigate(['/client-join']);

}
  
}
