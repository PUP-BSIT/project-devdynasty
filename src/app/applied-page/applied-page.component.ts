import { Component, OnInit } from '@angular/core';
import { UserService } from '../../service/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-applied-page',
  templateUrl: './applied-page.component.html',
  styleUrl: './applied-page.component.css'
})
export class AppliedPageComponent implements OnInit {
  userName!: string | undefined;
  userPhoto!: string | undefined
  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.userService.getSessionUserId();
    if (!this.userService.isLoggedIn()) {
      this.router.navigate(['/login']);
    }
    this.userService.getSessionUserDetails();
    this.userName = this.userService.userName;
    this.userPhoto = 
      `https://pupconnect.online/pup_connect_backend/${this.userService.userPhoto}`;
  }
}
