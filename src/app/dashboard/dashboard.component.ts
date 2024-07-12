import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../service/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  userName!: string | undefined;
  userPhoto!: string | undefined;

  isSidebarOpened: boolean = false;

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.userService.getSessionUserId();
    if (!this.userService.isLoggedIn()) {
      this.router.navigate(['/login']);
      return;
    }
    this.userService.getSessionUserDetails();;
    this.userName = this.userService.userName;
    this.userPhoto = 
      `https://pupconnect.online/pup_connect_backend/${this.userService.userPhoto}`;
  } 
  toggleSidebar() {
    this.isSidebarOpened = !this.isSidebarOpened;
  } 
}