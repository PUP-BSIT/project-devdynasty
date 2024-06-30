import { Component } from '@angular/core';
import { UserService } from '../../../service/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  isToggle = false;

  constructor(private userService: UserService, private router: Router) {}

  toggleDropdown(): void {
    this.isToggle = !this.isToggle;
  }

  logout(): void {
    this.userService.logout();
    this.router.navigate(['/login']);
  }
}