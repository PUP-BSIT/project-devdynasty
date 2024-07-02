import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from '../../../service/user.service';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
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

  constructor(private userService: UserService, public dialog: MatDialog) {}

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
        console.log('Job withdrawn successfully:', response);
        this.filteredJobs = this.filteredJobs
          .filter(job => job.JobID !== jobID);
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
