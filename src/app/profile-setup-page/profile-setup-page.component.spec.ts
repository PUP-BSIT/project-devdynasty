import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileSetupPageComponent } from './profile-setup-page.component';

describe('ProfileSetupPageComponent', () => {
  let component: ProfileSetupPageComponent;
  let fixture: ComponentFixture<ProfileSetupPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProfileSetupPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProfileSetupPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
