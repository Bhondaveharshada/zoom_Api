import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudMeetingComponent } from './stud-meeting.component';

describe('StudMeetingComponent', () => {
  let component: StudMeetingComponent;
  let fixture: ComponentFixture<StudMeetingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudMeetingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudMeetingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
