import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from '../../../service/user.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-job-list',
  templateUrl: './job-list.component.html',
  styleUrls: ['./job-list.component.css']
})
export class JobListComponent implements OnInit, OnDestroy{
  jobs: any = [];
  searchTermSubscription: Subscription = new Subscription();

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.searchTermSubscription = this.userService.searchTerm$.subscribe(
      ({ term, jobType }) => {
      this.userService.searchJobs(term, jobType).subscribe(data => {
        this.jobs = data;
      });
    });

    this.fetchJobs();
  }

  fetchJobs(): void {
    this.userService.getJobs().subscribe(data => {
      this.jobs = data;
    });
  }

  onApplyClick(event: Event): void {
    const button = event.target as HTMLElement;
    button.classList.add('clicked');
  }

  ngOnDestroy(): void {
    this.searchTermSubscription.unsubscribe();
  }
}