import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatemeetComponent } from './createmeet.component';

describe('CreatemeetComponent', () => {
  let component: CreatemeetComponent;
  let fixture: ComponentFixture<CreatemeetComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreatemeetComponent]
    });
    fixture = TestBed.createComponent(CreatemeetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
