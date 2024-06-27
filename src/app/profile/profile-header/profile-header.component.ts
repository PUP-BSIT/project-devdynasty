import { Component } from '@angular/core';
import { UserService } from '../../../service/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile-header',
  templateUrl: './profile-header.component.html',
  styleUrl: './profile-header.component.css'
})
export class ProfileHeaderComponent {
  constructor(private userService: UserService, private router: Router) {}

  logout(): void {
    this.userService.logout();
    this.router.navigate(['/login']);
  }
}
