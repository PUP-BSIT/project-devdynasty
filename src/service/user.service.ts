import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SignUpApiResponse } from '../model/signup_api_response';
import { LogInApiResponse } from '../model/login_api_response';
import { SetUpProfileApiResponse} from '../model/setup_profile_api_response';
import { UserDetailsResponse } from '../model/user_details_api_response';

@Injectable()
export class UserService {
  private isLogin: boolean = false;
  userID!: number;

  private apiUrl = 'http://localhost/pup_connect_backend/';

  constructor(private http: HttpClient) { }

  signUpUser(user: any): Observable<SignUpApiResponse> {
    return this.http.post<SignUpApiResponse>(this.apiUrl + 'signup.php', user);
  }

  setupProfile(formData: FormData): Observable<SetUpProfileApiResponse> {
    return this.http.post<SetUpProfileApiResponse>(this.apiUrl 
                                    + 'setup_profile.php', formData);
  }

  loginUser(user: any): Observable<LogInApiResponse> {
    return this.http.post<LogInApiResponse>(this.apiUrl + 'login.php', user);
  }

  setLoginStatus(status: boolean): void {
    this.isLogin = status;
  }

  isLoggedIn(): boolean {
    return this.isLogin;
  }

  getUserDetails(userid: number): Observable<UserDetailsResponse> {
    return this.http.post<UserDetailsResponse>
      (this.apiUrl + 'user_details.php', { user_id: userid });
  }
}
