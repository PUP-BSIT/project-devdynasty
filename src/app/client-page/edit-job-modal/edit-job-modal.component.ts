import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-job-modal',
  templateUrl: './edit-job-modal.component.html',
  styleUrls: ['./edit-job-modal.component.css']
})
export class EditJobModalComponent implements OnInit {
  @Input() job: any;
  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<any>();
  jobForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.jobForm = this.fb.group({
      Title: ['', Validators.required],
      Description: ['', Validators.required],
      Location: ['', Validators.required],
      JobType: ['', Validators.required],
      Rate: ['', Validators.required],
      Date: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    if (this.job) {
      this.jobForm.patchValue(this.job);
    }
  }

  onSave(): void {
    if (this.jobForm.valid) {
      const updatedJob = { ...this.job, ...this.jobForm.value };
      this.save.emit(updatedJob);
    }
  }

  onClose(): void {
    this.close.emit();
  }
}
