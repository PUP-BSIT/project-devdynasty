import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from '../../../service/user.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-withdrawn-jobs-list',
  templateUrl: './withdrawn-jobs-list.component.html',
  styleUrls: ['./withdrawn-jobs-list.component.css']
})
export class WithdrawnJobsListComponent implements OnInit, OnDestroy {
  withdrawnJobs: any[] = [];
  searchTermSubscription: Subscription = new Subscription();

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    const userID = this.userService.userID;
    this.searchTermSubscription = this.userService.searchTerm$
      .subscribe(({ term, jobType }) => {
      this.userService.searchExpiredAppliedJobs(userID, term, jobType)
        .subscribe(data => {
        this.withdrawnJobs = data.map(job => ({
          ...job,
          isExpired: job.status === 'No longer accepts applicants',
          EndDate: job.status === 'No longer accepts applicants' ? 
            job.end_date : null
        }));
      });
    });
    this.fetchWithdrawnJobs();
  }

  fetchWithdrawnJobs(): void {
    const userID = this.userService.userID;
    this.userService.getWithdrawnJobs(userID).subscribe(data => {
      this.withdrawnJobs = data.map(job => ({
        ...job,
        isExpired: job.status === 'No longer accepts applicants',
        EndDate: job.status === 'No longer accepts applicants' ? 
          job.end_date : null
      }));
    });
  }

  trackByJobId(job: any): number {
    return job.JobID;
  }

  ngOnDestroy(): void {
    this.searchTermSubscription.unsubscribe();
  }
}
