import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-job-post-form',
  templateUrl: './job-post-form.component.html',
  styleUrl: './job-post-form.component.css'
})
export class JobPostFormComponent {
  jobPostForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.jobPostForm = this.fb.group({
      clientName: ['', [Validators.required, Validators.maxLength(50)]],
      jobType: ['', Validators.required],
      jobTitle: ['', [Validators.required, Validators.maxLength(100)]],
      rate: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      jobDescription: ['', [Validators.required, Validators.maxLength(500)]],
      date: ['', Validators.required],
      location: ['', [Validators.required, Validators.maxLength(100)]]
    });
  }

  get clientName() {
    return this.jobPostForm.get('clientName');
  }

  get jobType() {
    return this.jobPostForm.get('jobType');
  }

  get jobTitle() {
    return this.jobPostForm.get('jobTitle');
  }

  get rate() {
    return this.jobPostForm.get('rate');
  }

  get jobDescription() {
    return this.jobPostForm.get('jobDescription');
  }

  get date() {
    return this.jobPostForm.get('date');
  }

  get location() {
    return this.jobPostForm.get('location');
  }

  onSubmit() {
    if (this.jobPostForm.valid) {
      console.log(this.jobPostForm.value);
    } else {
      this.jobPostForm.markAllAsTouched();
    }
  }
}
