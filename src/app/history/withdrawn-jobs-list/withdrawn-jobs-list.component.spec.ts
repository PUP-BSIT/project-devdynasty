import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WithdrawnJobsListComponent } from './withdrawn-jobs-list.component';

describe('WithdrawnJobsListComponent', () => {
  let component: WithdrawnJobsListComponent;
  let fixture: ComponentFixture<WithdrawnJobsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WithdrawnJobsListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WithdrawnJobsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
