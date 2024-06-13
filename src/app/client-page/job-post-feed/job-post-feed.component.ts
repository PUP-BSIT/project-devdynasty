import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../service/user.service';

@Component({
  selector: 'app-job-post-feed',
  templateUrl: './job-post-feed.component.html',
  styleUrls: ['./job-post-feed.component.css']
})
export class JobPostFeedComponent implements OnInit {
  jobs: any = [];
  userID: number = this.userService.userID; // Replace with the actual user ID, possibly obtained from authentication context

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.fetchJobsByUser(this.userID);
  }

  fetchJobsByUser(userID: number): void {
    this.userService.getJobsByUser(userID).subscribe(data => {
      this.jobs = data;
      console.log(this.jobs); // Debugging line to check the fetched jobs
    }, error => {
      console.error('Error fetching jobs:', error);
    });
  }
}
