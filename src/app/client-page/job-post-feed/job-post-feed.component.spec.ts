import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobPostFeedComponent } from './job-post-feed.component';

describe('JobPostFeedComponent', () => {
  let component: JobPostFeedComponent;
  let fixture: ComponentFixture<JobPostFeedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [JobPostFeedComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(JobPostFeedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
