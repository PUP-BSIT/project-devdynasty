import { Component, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { JobApiResponse } from '../../../model/job_form_api_response';
import { UserService } from '../../../service/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-job-post-form',
  templateUrl: './job-post-form.component.html',
  styleUrl: './job-post-form.component.css'
})
export class JobPostFormComponent{
  jobPostForm: FormGroup;

  @Output() jobPosted = new EventEmitter<void>();

  constructor(private fb: FormBuilder, private userService: UserService, 
      private _snackBar: MatSnackBar) {
    this.jobPostForm = this.fb.group({
      JobType: ['', Validators.required],
      Title: ['', [Validators.required, Validators.maxLength(100)]],
      Rate: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      Description: ['', [Validators.required, Validators.maxLength(500)]],
      Date: ['', Validators.required],
      Location: ['', [Validators.required, Validators.maxLength(100)]]
    });
  }

  get jobType() {
    return this.jobPostForm.get('JobType');
  }

  get jobTitle() {
    return this.jobPostForm.get('Title');
  }

  get rate() {
    return this.jobPostForm.get('Rate');
  }

  get jobDescription() {
    return this.jobPostForm.get('Description');
  }

  get date() {
    return this.jobPostForm.get('Date');
  }

  get location() {
    return this.jobPostForm.get('Location');
  }

  onSubmit(): void {
    if (this.jobPostForm.valid) {
      const UserID = this.userService.userID;

      const newJob: JobApiResponse = {
        ...this.jobPostForm.value,
        UserID
      };
      this.userService.addJob(newJob).subscribe(response => {
        this._snackBar.open(response.message, 'Close', {
          duration: 5000,
        });
        this.jobPosted.emit();
      })
      this.jobPostForm.reset();
    }
  }
}
