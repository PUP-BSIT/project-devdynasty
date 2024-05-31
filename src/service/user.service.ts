import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SignUpApiResponse } from '../model/signup_api_response';

@Injectable()
export class UserService {
  private isLogin: boolean = false;

  private apiUrl = 'http://localhost/pup_connect_backend/';

  constructor(private http: HttpClient) { }

  signUpUser(user: any): Observable<SignUpApiResponse> {
    return this.http.post<SignUpApiResponse>(this.apiUrl + 'signup.php', user);
  }

  loginUser(user: any): Observable<any> {
    return this.http.post<any>(this.apiUrl + 'login.php', user);
  }

  setLoginStatus(status: boolean): void {
    this.isLogin = status;
  }

  isLoggedIn(): boolean {
    return this.isLogin;
  }
}