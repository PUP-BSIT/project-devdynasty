import { Component, OnInit } from '@angular/core';
import { JobApiResponse } from '../../../model/job_form_api_response';
import { UserService } from '../../../service/user.service';

@Component({
  selector: 'app-job-list',
  templateUrl: './job-list.component.html',
  styleUrls: ['./job-list.component.css']
})
export class JobListComponent implements OnInit{
  jobs: any = [];

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.fetchJobs();
  }

  fetchJobs(): void {
    this.userService.getJobs().subscribe(data => {
      this.jobs = data;
    }, error => {
      console.error('Error fetching jobs:', error);
    });
  }

  onApplyClick(event: Event) {
    const button = event.target as HTMLElement;
    button.classList.add('clicked');
  }
}