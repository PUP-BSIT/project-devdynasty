import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../service/user.service';
import { UserDetailsResponse } from '../../model/user_details_api_response';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {
  userDetails?: UserDetailsResponse;

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    if (!this.userService.isLoggedIn()) {
      this.router.navigate(['/login']);
    } else {
      const userid = this.userService.userID;
      this.userService.getUserDetails(userid).subscribe((response) => {
        this.userDetails = response;
        console.log(this.userDetails);
        
      });
    }
  }
}
