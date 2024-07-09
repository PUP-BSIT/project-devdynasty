import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../../service/user.service';
import { JobPostFeedComponent } from './job-post-feed/job-post-feed.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-client-page',
  templateUrl: './client-page.component.html',
  styleUrl: './client-page.component.css'
})
export class ClientPageComponent implements OnInit {
  userName!: string | undefined;
  userPhoto!: string | undefined
  selectedJob: any = null;
  applicants: any[] = [];

  constructor(private userService: UserService, private router: Router) {}

  @ViewChild(JobPostFeedComponent) jobPostFeedComponent!: JobPostFeedComponent;

  ngOnInit(): void {
    this.userService.getSessionUserId();
    if (!this.userService.isLoggedIn()) {
      this.router.navigate(['/login']);
      return;
    }
    this.userService.getSessionUserDetails();
    this.userName = this.userService.userName;
    this.userPhoto = 
      `https://pupconnect.online/pup_connect_backend/${this.userService.userPhoto}`;
  }
  
  handleJobSelection(job: any): void {
    this.selectedJob = job;
    this.fetchApplicants(job.JobID);
  }

  fetchApplicants(jobID: number): void {
    this.userService.getApplicantsByJob(jobID).subscribe(data => {
      if (Array.isArray(data)) {
        this.applicants = data;
        return;
      }
    });
  }

  onJobPosted() {
    this.jobPostFeedComponent.fetchJobsByUser(this.userService.userID);
  }
}
