import { Component, OnInit, Inject, NgZone } from '@angular/core';
 import { HttpClient } from '@angular/common/http';
import { DOCUMENT } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { MeetingService } from '../services/meeting.service';
import { ZoomMtg } from '@zoom/meetingsdk';

ZoomMtg.preLoadWasm();
ZoomMtg.prepareWebSDK();

@Component({
  selector: 'app-client-join',
  templateUrl: './client-join.component.html',
  styleUrls: ['./client-join.component.css']
})
export class ClientJoinComponent {

  authEndpoint = 'http://localhost:4000/signature'
  sdkKey = 'v_ILNsd6RIaXDo60R4yviQ'
  meetingNumber = ''
  passWord = ''
  role = 0
  userName = 'Prasad'
  userEmail = ''
  registrantToken = ''
  zakToken = ''
  leaveUrl = 'http://localhost:4200/client'

 
  

  constructor(
    public httpClient: HttpClient,
    @Inject(DOCUMENT) document,
    private ngZone: NgZone,
    private activatedroute: ActivatedRoute,
    private meetingservice:MeetingService

  ) {}

  ngOnInit():void {
    const meetingDetails = this.meetingservice.getMeetingDetails();
    this.meetingNumber = meetingDetails.meetingId,
    this.passWord = meetingDetails.password
 
    console.log('Meeting ID:', this.meetingNumber);
    console.log('Password:', this.passWord);
 
    if(this.meetingNumber!=='' && this.passWord!== ''){
     this.getSignature()
    }
 
  }
    
  getSignature() {
    this.httpClient.post(this.authEndpoint, {
        meetingNumber: this.meetingNumber,
        role: this.role
    }).subscribe({
      next:(data: any) => {
        console.log("signature", data.signature);
        
        if (data.signature) {
          console.log(data.signature);
          this.startMeeting(data.signature);
        } else {
          console.log(data);
        }
      }, error:(error) => {
        console.log(error);
      }
      });
    
  }
    
    
  
  
  startMeeting(signature:any) {

   document.getElementById('zmmtg-root').style.display = 'block'

   this.ngZone.runOutsideAngular(() => {
    ZoomMtg.init({
      leaveUrl: this.leaveUrl,
      patchJsMedia: true,
      leaveOnPageUnload: true,
      success: (success) => {
        console.log(success)
        ZoomMtg.join({
          signature: signature,
          sdkKey: this.sdkKey,
          meetingNumber: this.meetingNumber,
          passWord: this.passWord,
          userName: this.userName,
          userEmail: this.userEmail,
          tk: this.registrantToken,
          zak: this.role === 1 ? this.zakToken : undefined,
          success: (success) => {
            console.log(success)
          },
          error: (error) => {
            ZoomMtg.setLogLevel('error');
            console.log(error)
          }
        })
      },
      error: (error) => {
        ZoomMtg.setLogLevel('error');
        console.log(error)
      }
    })
  })
}

}
