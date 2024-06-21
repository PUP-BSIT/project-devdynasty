import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../service/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-job-post-feed',
  templateUrl: './job-post-feed.component.html',
  styleUrls: ['./job-post-feed.component.css']
})
export class JobPostFeedComponent implements OnInit {
  jobs: any = [];
  selectedJob: any = null;
  applicants: any = [];
  userID: number = this.userService.userID;

  constructor(private userService: UserService, 
    private _snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.fetchJobsByUser(this.userID);
  }

  fetchJobsByUser(userID: number): void {
    this.userService.getJobsByUser(userID).subscribe(data => {
      if (Array.isArray(data)) {
        this.jobs = data;
      } else {
        console.error('Expected an array of jobs but got:', data);
      }
      console.log(this.jobs);
    });
  }

  fetchApplicantsByJob(jobID: number): void {
    this.userService.getApplicantsByJob(jobID).subscribe(data => {
      if (Array.isArray(data)) {
        this.applicants = data;
        console.log(this.applicants);
      } else {
        console.error('Expected an array of applicants but got:', data);
      }
      console.log(this.applicants);
    });
  }

  openEditModal(job: any): void {
    this.selectedJob = job;
  }

  closeEditModal(): void {
    this.selectedJob = null;
  }

  updateJob(updatedJob: any): void {
    this.userService.updateJob(updatedJob.JobID, updatedJob).subscribe(
      () => {
        this.fetchJobsByUser(this.userID);
        this.closeEditModal();
        this._snackBar.open('Job updated successfully', 'Close', {
          duration: 5000,
        });
      },
      error => {
        console.error('Error updating job:', error);
        this._snackBar.open('Failed to update job', 'Close', {
          duration: 5000,
        });
      }
    );
  }

  deleteJob(jobId: number): void {
    this.userService.deleteJob(jobId).subscribe(response => {
      this._snackBar.open(response.message, 'Close', {
        duration: 5000,
      });
      this.fetchJobsByUser(this.userID);
    });
  }

  viewApplicants(jobID: number): void {
    this.fetchApplicantsByJob(jobID);

  }
}
