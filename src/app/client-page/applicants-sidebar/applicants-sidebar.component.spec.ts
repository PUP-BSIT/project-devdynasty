import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicantsSidebarComponent } from './applicants-sidebar.component';

describe('ApplicantsSidebarComponent', () => {
  let component: ApplicantsSidebarComponent;
  let fixture: ComponentFixture<ApplicantsSidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ApplicantsSidebarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ApplicantsSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
