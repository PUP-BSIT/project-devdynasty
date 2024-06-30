import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicantProfileModalComponent } from './applicant-profile-modal.component';

describe('ApplicantProfileModalComponent', () => {
  let component: ApplicantProfileModalComponent;
  let fixture: ComponentFixture<ApplicantProfileModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ApplicantProfileModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ApplicantProfileModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
