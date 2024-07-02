import { Component, OnInit } from '@angular/core';
import { UserService } from '../../service/user.service';

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

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userName = this.userService.userName;
    this.userPhoto = 
      `http://localhost/pup_connect_backend/${this.userService.userPhoto}`;
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
}
