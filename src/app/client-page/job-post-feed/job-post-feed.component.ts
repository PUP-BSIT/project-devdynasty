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
  userID: number = this.userService.userID; 

  constructor(private userService: UserService, private _snackBar: MatSnackBar) {}

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

  deleteJob(jobId: number): void {
    this.userService.deleteJob(jobId).subscribe(response => {
      this._snackBar.open(response.message, 'Close', {
        duration: 5000,
      });
      this.fetchJobsByUser(this.userID);  
    });
  }
}
