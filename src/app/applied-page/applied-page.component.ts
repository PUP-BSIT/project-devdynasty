import { Component, OnInit } from '@angular/core';
import { UserService } from '../../service/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-applied-page',
  templateUrl: './applied-page.component.html',
  styleUrl: './applied-page.component.css'
})
export class AppliedPageComponent implements OnInit {
  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    if (!this.userService.isLoggedIn()) {
      this.router.navigate(['/login']);
    }
  }
}
