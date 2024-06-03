import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-profile-setup-page',
  templateUrl: './profile-setup-page.component.html',
  styleUrl: './profile-setup-page.component.css'
})
export class ProfileSetupPageComponent implements OnInit {
  token: string = '';

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.token = params.get('token')!;
      this.verifyToken(this.token);
    });
  }

  verifyToken(token: string): void {
    this.http
      .get(`http://localhost/pup_connect_backend/verify_user.php?token=${token}`)
      .subscribe(response => {
        console.log(response);
    });
  }
}
