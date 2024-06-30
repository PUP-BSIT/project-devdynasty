import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../service/user.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {
  userName: string = '';
  userPhoto: string = '';
  withdrawnJobs: any[] = []; // Add a property to store the withdrawn jobs

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    if (!this.userService.isLoggedIn()) {
      this.router.navigate(['/login']);
    } else {
      this.userName = this.userService.userName || 'Default User';
      this.userPhoto = `http://localhost/pup_connect_backend/${this.userService.userPhoto}`;
      
      // Fetch the withdrawn jobs data
      this.userService.getWithdrawnJobs().subscribe(data => {
        this.withdrawnJobs = data;
      });
    }
  }
}