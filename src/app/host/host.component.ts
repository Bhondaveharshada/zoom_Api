  import { Component, OnInit, Inject, NgZone,ElementRef,ViewChild } from '@angular/core';
  import { HttpClient } from '@angular/common/http';
  import { DOCUMENT } from '@angular/common';
  import { ActivatedRoute, Router} from '@angular/router';
import { MeetingService } from '../services/meeting.service';


import ZoomMtgEmbedded from '@zoom/meetingsdk/embedded';

@Component({
  selector: 'app-host',
  templateUrl: './host.component.html',
  styleUrls: ['./host.component.css']
})
export class HostComponent {
  authEndpoint = 'http://localhost:4000/signature'
  sdkKey = 'v_ILNsd6RIaXDo60R4yviQ'
  meetingNumber = ''
  passWord = ''
  role = 1
  userName = 'Harshada Bhondave'
  userEmail = 'harshadabhondave09@gmail.com'
  registrantToken = ''
  zakToken = ''
  leaveUrl = 'http://localhost:4200/creatmeeting'

  client = ZoomMtgEmbedded.createClient();

  @ViewChild('startBtn') startButton!: ElementRef<HTMLButtonElement>;
  @ViewChild('stopBtn') stopButton!: ElementRef<HTMLButtonElement>;
  @ViewChild('downloadBtn') downloadButton!: ElementRef<HTMLAnchorElement>;
  @ViewChild('recordedVideo') recordedVideo!: ElementRef<HTMLVideoElement>;

  stream: MediaStream | null = null;
  audio: MediaStream | null = null;
  mixedStream: MediaStream | null = null;
  chunks: BlobPart[] = [];
  recorder: MediaRecorder | null = null;
  downloadUrl: string | null = null;
 
 /*  startButton: HTMLElement | null = null;
  stopButton: HTMLElement | null = null;
  downloadButton: HTMLAnchorElement | null = null;
  recordedVideo: HTMLVideoElement | null = null;
 */
  

  constructor(
    public httpClient: HttpClient,
    @Inject(DOCUMENT) document,
    private ngZone: NgZone,
    private activatedroute: ActivatedRoute,
    private router: Router,
    private meetingservice:MeetingService

  ) {}

  ngOnInit() :void{

    this.activatedroute.queryParams.subscribe(params => {
      this.meetingNumber = params['meetingId'];
      this.passWord = params['password'];

      console.log('Meeting ID:', this.meetingNumber);
      console.log('Password:', this.passWord);

      if (this.meetingNumber !== '' && this.passWord !== '') {
        this.getSignature();
      }
    });
    
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

    let meetingSDKElement = document.getElementById('meetingSDKElement');

    this.ngZone.runOutsideAngular(() => {
      this.client.init({zoomAppRoot: meetingSDKElement,
        language: 'en-US',
        patchJsMedia: true,
        leaveOnPageUnload: true,
        customize:{
          video:{
            isResizable:false,
            viewSizes:{
              default:{
                width:1000,
                height:550
              },
              ribbon:{
                width:300,
                height:600
              }
            }
          }
        }
      }).then(() => {
        
        console.log("zoom initialized");

        
        
        this.client.join({
          signature: signature,
          sdkKey: this.sdkKey,
          meetingNumber: this.meetingNumber,
          password: this.passWord,
          userName: this.userName,
          userEmail: this.userEmail,
          tk: this.registrantToken,
          zak: this.zakToken
        }).then(() => {
          console.log('joined successfully')
        }).catch((error) => {
          console.log(error)
        })
      }).catch((error) => {
        console.log(error)
      })
    })
  }
    

  async setupStream() {
    try {
      this.stream = await navigator.mediaDevices.getDisplayMedia({ video: true });
      this.audio = await navigator.mediaDevices.getUserMedia({
        audio: { echoCancellation: true, noiseSuppression: true, sampleRate: 44100 }
      });

      this.setupVideoFeedback();
    } catch (err) {
      console.error('Error setting up stream:', err);
    }
  }

  setupVideoFeedback() {
    if (this.stream) {
      const videoElement = this.recordedVideo.nativeElement;
      videoElement.srcObject = this.stream;
      videoElement.play();
    } else {
      console.warn('No stream available');
    }
  }

  async startRecording() {
    await this.setupStream();

    if (this.stream && this.audio) {
      this.mixedStream = new MediaStream([...this.stream.getTracks(), ...this.audio.getTracks()]);
      this.recorder = new MediaRecorder(this.mixedStream);

      this.recorder.ondataavailable = (e: BlobEvent) => this.chunks.push(e.data);
      this.recorder.onstop = () => this.handleStop();

      this.recorder.start(1000);

      this.startButton.nativeElement.setAttribute('disabled', 'true');
      this.stopButton.nativeElement.removeAttribute('disabled');
      
      console.log('Recording started');
    } else {
      console.warn('No stream or audio available.');
    }
  }

  stopRecording() {
    if (this.recorder) {
      this.recorder.stop();
    }

    this.startButton.nativeElement.removeAttribute('disabled');
    this.stopButton.nativeElement.setAttribute('disabled', 'true');

    console.log('Recording stopped');
  }

  handleStop() {
    const blob = new Blob(this.chunks, { type: 'video/mp4' });
    this.chunks = [];

    this.downloadUrl = URL.createObjectURL(blob);
    this.downloadButton.nativeElement.href = this.downloadUrl;
    this.downloadButton.nativeElement.download = 'video.mp4';
    this.downloadButton.nativeElement.removeAttribute('disabled');

    const videoElement = this.recordedVideo.nativeElement;
    videoElement.srcObject = null;
    videoElement.src = this.downloadUrl;
    videoElement.load();
    videoElement.onloadeddata = () => {
      const recordedVideoWrap = document.querySelector('.recorded-video-wrap');
      if (recordedVideoWrap) {
        recordedVideoWrap.classList.remove('d-none');
        recordedVideoWrap.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
      videoElement.play();
    };

    this.stream?.getTracks().forEach(track => track.stop());
    this.audio?.getTracks().forEach(track => track.stop());
  }
   

    
    
    
  
  
  


}
