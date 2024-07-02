import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WithdrawConfirmMessageComponent } from './withdraw-confirm-message.component';

describe('WithdrawConfirmMessageComponent', () => {
  let component: WithdrawConfirmMessageComponent;
  let fixture: ComponentFixture<WithdrawConfirmMessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WithdrawConfirmMessageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WithdrawConfirmMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
