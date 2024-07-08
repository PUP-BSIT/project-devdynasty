import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from '../../../service/user.service';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { WithdrawConfirmMessageComponent } from '../withdraw-confirm-message/withdraw-confirm-message.component';

@Component({
  selector: 'app-applied-job-list',
  templateUrl: './applied-job-list.component.html',
  styleUrls: ['./applied-job-list.component.css']
})
export class AppliedJobListComponent implements OnInit, OnDestroy {
  jobs: any[] = [];
  userID: number = this.userService.userID;
  filteredJobs: any[] = [];
  searchTermSubscription: Subscription = new Subscription();
  now = new Date();
  offset = this.now.getTimezoneOffset() * 60000;
  philippinesTime = new Date(this.now.getTime() + this.offset + (8 * 3600000));
  year = this.philippinesTime.getFullYear();
  month = String(this.philippinesTime.getMonth() + 1).padStart(2, '0');
  day = String(this.philippinesTime.getDate()).padStart(2, '0');

  formattedDate = `${this.year}-${this.month}-${this.day}`;

  constructor(private userService: UserService, public dialog: MatDialog,
                private _snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.searchTermSubscription = this.userService.searchTerm$.subscribe(
      ({ term, jobType }) => {
        this.userService.searchAppliedJobs(this.userID, term, jobType)
          .subscribe(data => {
            if (Array.isArray(data)) {
              this.jobs = this.mapJobData(data);
              this.filteredJobs = [...this.jobs];
            } else {
              console.error('Expected an array of applied jobs but got:', data);
            }
          }, error => {
            console.error('Error fetching applied jobs:', error);
          });
        }
    );
    this.fetchAppliedJobs(this.userID);
  }

  fetchAppliedJobs(userID: number): void {
    this.userService.getAppliedJobsByUser(userID).subscribe(data => {
      if (Array.isArray(data)) {
        this.jobs = this.mapJobData(data);
        this.filteredJobs = [...this.jobs];
        console.log(this.jobs);
      } else {
        console.error('Expected an array of applied jobs but got:', data);
      }
    }, error => {
      console.error('Error fetching applied jobs:', error);
    });
  }

  mapJobData(data: any[]): any[] {
    return data.map(job => ({
      title: job.Title,
      company: job.Description,
      location: job.Location,
      salary: `$ ${job.Rate}`,
      date: job.Date,
      highlighted: false,
      icon: 'assets/Job_Page/globe_icon.png',
      salaryIcon: 'assets/Job_Page/money_icon.png',
      JobID: job.JobID
    }));
  }

  confirmWithdrawJob(jobID: number): void {
    const dialogRef = this.dialog.open(WithdrawConfirmMessageComponent, {
      width: '450px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.withdrawJob(jobID);
      }
    });
  }
  
  withdrawJob(jobID: number): void {
    this.userService.withdrawJob(this.userID, jobID).subscribe(
      response => {
        this._snackBar.open("Job withdrawn successfully", 'Close', {
          duration: 5000,
        });
        this.jobs = this.jobs.filter(job => job.JobID !== jobID);
        this.filteredJobs = this.filteredJobs.filter(job => job.JobID !== jobID);
      },
      error => {
        console.error('Error withdrawing job:', error);
      }
    );
  }

  ngOnDestroy(): void {
    this.searchTermSubscription.unsubscribe();
  }
}
