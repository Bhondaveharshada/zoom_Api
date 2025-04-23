import { Component ,ElementRef, ViewChild, OnInit} from '@angular/core';
import { ZoomService } from '../zoom.service';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { MeetingService } from '../services/meeting.service';




@Component({
  selector: 'app-createmeet',
  templateUrl: './createmeet.component.html',
  styleUrls: ['./createmeet.component.css'],
  providers:[DatePipe]
})
export class CreatemeetComponent implements OnInit {

 constructor(private zoomservice:ZoomService, private router:Router,private datePipe: DatePipe,private meetingservice:MeetingService ){}
 @ViewChild('modal') modal!: ElementRef;

meetings:any = []

 meetingData = {
   topic: '',
   type: 2, // Scheduled Meeting by default
   start_time: '',
   duration: 30, // Default 30 minutes
   timezone: '',
   agenda: ''
 };

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
 openModal() {
   const modalElement = this.modal.nativeElement;
   modalElement.style.display = 'block';  
   modalElement.classList.add('show');    
 }


 closeModal() {
   const modalElement = this.modal.nativeElement;
   modalElement.style.display = 'none';   
   modalElement.classList.remove('show'); 
 }

 
 createMeeting(){
  console.log('Meeting Data:', this.meetingData);
  if(this.meetingData){
    this.zoomservice.createMeet(this.meetingData).subscribe({
      next:(res:any)=>{
        alert("meeting is created");
        console.log(res.response);
        this.getMeetings()
      },error:(error)=>{
        console.log("error creating meeting");
      }
    })
    this.closeModal();
  }else{
    alert("something went wrong in creating meeting");
  }
};

startHostMeeting(meetingId: string, password: string) {

  this.meetingservice.setMeetingDetails(meetingId,password)
  // Navigate to the HostComponent a
 console.log(meetingId);
 console.log(password);
 
  this.router.navigate(['/host'], { 
    queryParams: { meetingId: meetingId, password: password } 
    });
}
}
   
   
      
      
      


