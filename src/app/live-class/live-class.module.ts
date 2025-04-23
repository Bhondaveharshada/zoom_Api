import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LiveClassRoutingModule } from './live-class-routing.module';
import { MeetingComponent } from './meeting/meeting.component';
import { ReactiveFormsModule } from '@angular/forms';
import { JoinMeetingComponent } from './join-meeting/join-meeting.component';
import { StartMeetingComponent } from './start-meeting/start-meeting.component';
import { StudMeetingComponent } from './stud-meeting/stud-meeting.component';
import { LiveClassComponent } from './live-class.component';


@NgModule({
  declarations: [
   
    MeetingComponent,
    JoinMeetingComponent,
    StartMeetingComponent,
    StudMeetingComponent,
    
  ],
  imports: [
    CommonModule,
    LiveClassRoutingModule,
    ReactiveFormsModule,

  ]
})
export class LiveClassModule { }
