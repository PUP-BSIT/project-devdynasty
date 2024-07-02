
import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogData } from '../../../model/dialog_data';

@Component({
  selector: 'app-withdraw-confirm-message',
  templateUrl: './withdraw-confirm-message.component.html',
  styleUrl: './withdraw-confirm-message.component.css'
})
export class WithdrawConfirmMessageComponent {
  constructor(
    public dialogRef: MatDialogRef<WithdrawConfirmMessageComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
