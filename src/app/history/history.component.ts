import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../service/user.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {
  userName: string | undefined;
  userPhoto: string | undefined;
  withdrawnJobs: any[] = []; 

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.userService.getSessionUserId();
    if (!this.userService.isLoggedIn()) {
      this.router.navigate(['/login']);
    } else {
      this.userService.getSessionUserDetails();
      this.userName = this.userService.userName;
      this.userPhoto = 
      `https://pupconnect.online/pup_connect_backend/${this.userService.userPhoto}`;
      
      this.userService.getWithdrawnJobs(this.userService.userID).subscribe(data => {
        this.withdrawnJobs = data;
      });
    }
  }
}
