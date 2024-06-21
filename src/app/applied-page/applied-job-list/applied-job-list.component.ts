import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from '../../../service/user.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-applied-job-list',
  templateUrl: './applied-job-list.component.html',
  styleUrl: './applied-job-list.component.css'
})
export class AppliedJobListComponent implements OnInit, OnDestroy{
  jobs: any[] = [];
  userID: number = this.userService.userID;
  filteredJobs: any[] = [];
  searchTermSubscription: Subscription = new Subscription();

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.searchTermSubscription = this.userService.searchTerm$.subscribe(
      ({ term, jobType }) => {
        this.userService.searchAppliedJobs(this.userID, term, jobType).subscribe(data => {
          if (Array.isArray(data)) {
            this.jobs = data.map(job => ({
              title: job.Title,
              company: job.Description,  
              location: job.Location,
              salary: `$ ${job.Rate}`,
              highlighted: false,  
              icon: 'assets/Job_Page/globe_icon.png',
              salaryIcon: 'assets/Job_Page/money_icon.png'
            }));
            this.filteredJobs = [...this.jobs];  
          } else {
            console.error('Expected an array of applied jobs but got:', data);
          }
        });
      }
    );
    this.fetchAppliedJobs(this.userID);
  }

  fetchAppliedJobs(userID: number): void {
    this.userService.getAppliedJobsByUser(userID).subscribe(data => {
      if (Array.isArray(data)) {
        this.jobs = data.map(job => ({
          title: job.Title,
          company: job.Description,  
          location: job.Location,
          salary: `$ ${job.Rate}`,
          highlighted: false,  
          icon: 'assets/Job_Page/globe_icon.png',
          salaryIcon: 'assets/Job_Page/money_icon.png'
        }));
        this.filteredJobs = [...this.jobs];
      } else {
        console.error('Expected an array of applied jobs but got:', data);
      }
      console.log(this.jobs);
    });
  }

  ngOnDestroy(): void {
    this.searchTermSubscription.unsubscribe();
  }
}
