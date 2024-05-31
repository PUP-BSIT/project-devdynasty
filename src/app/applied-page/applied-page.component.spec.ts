import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppliedPageComponent } from './applied-page.component';

describe('AppliedPageComponent', () => {
  let component: AppliedPageComponent;
  let fixture: ComponentFixture<AppliedPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppliedPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AppliedPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
