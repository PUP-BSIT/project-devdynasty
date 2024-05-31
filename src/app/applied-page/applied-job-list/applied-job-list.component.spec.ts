import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppliedJobListComponent } from './applied-job-list.component';

describe('AppliedJobListComponent', () => {
  let component: AppliedJobListComponent;
  let fixture: ComponentFixture<AppliedJobListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppliedJobListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AppliedJobListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
