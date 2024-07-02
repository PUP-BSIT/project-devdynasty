import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../service/user.service';

@Component({
  selector: 'app-withdrawn-jobs-list',
  templateUrl: './withdrawn-jobs-list.component.html',
  styleUrls: ['./withdrawn-jobs-list.component.css']
})
export class WithdrawnJobsListComponent implements OnInit {
  withdrawnJobs: any[] = [];

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    const userID = this.userService.userID;
    this.userService.getWithdrawnJobs(userID).subscribe(data => {
      this.withdrawnJobs = data;
    });
  }
}
