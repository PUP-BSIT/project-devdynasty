import { Component, OnInit } from '@angular/core';
import { UserService } from '../../service/user.service';

@Component({
  selector: 'app-client-page',
  templateUrl: './client-page.component.html',
  styleUrl: './client-page.component.css'
})
export class ClientPageComponent implements OnInit {
  userName!: string | undefined;
  userPhoto!: string | undefined

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userName = this.userService.userName;
    this.userPhoto = 
      `http://localhost/pup_connect_backend/${this.userService.userPhoto}`;
  }
}
