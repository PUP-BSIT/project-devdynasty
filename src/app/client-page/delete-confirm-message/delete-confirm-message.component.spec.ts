import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteConfirmMessageComponent } from './delete-confirm-message.component';

describe('DeleteConfirmMessageComponent', () => {
  let component: DeleteConfirmMessageComponent;
  let fixture: ComponentFixture<DeleteConfirmMessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DeleteConfirmMessageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DeleteConfirmMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
