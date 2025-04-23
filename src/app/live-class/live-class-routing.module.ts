import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LiveClassComponent } from './live-class.component';
import { MeetingComponent } from './meeting/meeting.component';
import { JoinMeetingComponent } from './join-meeting/join-meeting.component';
import { StartMeetingComponent } from './start-meeting/start-meeting.component';
import { StudMeetingComponent } from './stud-meeting/stud-meeting.component';

const routes: Routes = [
  {path: '', component:LiveClassComponent,
    children: [
     { path:'host', component:MeetingComponent},
     {path:'join-meeting', component:JoinMeetingComponent},
     {path:'start-meeting',component:StartMeetingComponent},
     {path:'stud',component:StudMeetingComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LiveClassRoutingModule { }
