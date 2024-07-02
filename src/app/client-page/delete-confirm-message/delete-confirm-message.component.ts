import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogData } from '../../../model/dialog_data';

@Component({
  selector: 'app-delete-confirm-message',
  templateUrl: './delete-confirm-message.component.html',
  styleUrl: './delete-confirm-message.component.css'
})
export class DeleteConfirmMessageComponent {
  constructor(
    public dialogRef: MatDialogRef<DeleteConfirmMessageComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
