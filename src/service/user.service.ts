import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';

import { SignUpApiResponse } from '../model/signup_api_response';
import { LogInApiResponse } from '../model/login_api_response';
import { SetUpProfileApiResponse} from '../model/setup_profile_api_response';
import { UserDetailsResponse } from '../model/user_details_api_response';
import { JobApiResponse } from '../model/job_form_api_response';
import { UpdateProfileApiResponse } from '../model/update_profile_api_response';
import { ApplicationResponse } from '../model/create_application_api_response'
import { ForgotPasswordResponse } from '../model/forgot_password_api_response';
import { VerifyUserApiResponse } from '../model/verify_user_api_response';
import { SearchJobsApiResponse } from '../model/search_jobs_api_response';
import { SearchAppliedJobsApiResponse } from '../model/search_applied_jobs_api_response';
import { UpdateJobApiResponse } from '../model/update_job_api_response';
import { DeleteJobApiResponse } from '../model/delete_job_api_response';
import { AppliedJobsApiResponse } from '../model/applied_jobs_by_user_api_response';
import { ApplicantsApiResponse } from '../model/applicants_by_jobs_api_response';
import { WithdrawJobApiResponse } from '../model/withdraw_job_api_response';
import { WithdrawnJobsApiResponse } from '../model/withdrawn_jobs_api_response';

@Injectable()
export class UserService {
  private isLogin: boolean = false;
  userID!: number;
  userName!: string | undefined;
  userPhoto!: string | undefined;

  private searchTermSubject = new BehaviorSubject<{ 
    term: string, jobType: string }>({ term: '', jobType: '' });

  searchTerm$ = this.searchTermSubject.asObservable();

  private apiUrl = 'http://localhost/pup_connect_backend/';

  constructor(private http: HttpClient) { }

  signUpUser(user: any): Observable<SignUpApiResponse> {
    return this.http.post<SignUpApiResponse>(this.apiUrl + 'signup.php', user);
  }

  setupProfile(formData: FormData): Observable<SetUpProfileApiResponse> {
    return this.http.post<SetUpProfileApiResponse>(this.apiUrl 
                                    + 'setup_profile.php', formData);
  }

  verifyUser(token: string): Observable<VerifyUserApiResponse> {
    return this.http.get<VerifyUserApiResponse>(this.apiUrl + 
      `verify_user.php?token=${token}`);
  }

  editProfile(formData: FormData): Observable<UpdateProfileApiResponse> {
    return this.http.post<UpdateProfileApiResponse>(this.apiUrl + 
      'edit_profile.php', formData);
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

  logout(): void {
    this.isLogin = false;
  }

  getUserDetails(userid: number): Observable<UserDetailsResponse> {
    return this.http.post<UserDetailsResponse>
      (this.apiUrl + 'user_details.php', { user_id: userid });
  }

  getJobs(userId?: number): Observable<JobApiResponse[]> {
    return this.http.get<JobApiResponse[]>(
      this.apiUrl + `get_jobs.php?userId=${userId}`
    );
  }

  getJobsByUser(userID: number): Observable<JobApiResponse[]> {
    return this.http.post<JobApiResponse[]>(this.apiUrl + 
      'get_jobs_by_user.php', { UserID: userID });
  }

  addJob(job: any): Observable<JobApiResponse> {
    return this.http.post<JobApiResponse>(this.apiUrl + 'add_job.php', job);
  }

  setSearchTerm(term: string, jobType: string): void {
    this.searchTermSubject.next({ term, jobType });
  }

  searchJobs(term: string, jobType: string, userId: number): 
                        Observable<SearchJobsApiResponse> {
    let url = `${this.apiUrl}/search_jobs.php?term=${term}`;

    if (jobType) {
      url += `&jobType=${jobType}`;
    }

    if (userId) {
      url += `&userId=${userId}`;
    }

    return this.http.get<any>(url);
  }

  searchAppliedJobs(userID: number, term: string, jobType: string): 
                                Observable<SearchAppliedJobsApiResponse> {
    let url = `${this.apiUrl}/search_applied_jobs.php?userID=${userID}&term=${term}`;
    if (jobType) {
      url += `&jobType=${jobType}`;
    }
    return this.http.get<any>(url);
  }
  
  updateJob(jobID: number, jobData: any): Observable<UpdateJobApiResponse> {
    return this.http.put<UpdateJobApiResponse>(`${this.apiUrl}update_job.php?id=${jobID}`, jobData);
  }

  deleteJob(jobId: number): Observable<DeleteJobApiResponse> {
    return this.http.delete<DeleteJobApiResponse>(
      `${this.apiUrl}/delete_job.php?JobID=${jobId}`
    );
  }

  createApplication(jobId: number, userId: number): Observable<ApplicationResponse> {
    const applicationData = {
      JobID: jobId,
      UserID: userId
    };
    return this.http.post<ApplicationResponse>(
      `${this.apiUrl}create_application.php`, applicationData);
  }

  getAppliedJobsByUser(userID: number): Observable<AppliedJobsApiResponse> {
    return this.http.get<AppliedJobsApiResponse>(`${this.apiUrl}/get_applied_jobs.php?userID=${userID}`);
  }
  
  getApplicantsByJob(jobID: number): Observable<ApplicantsApiResponse> {
    return this.http.get<ApplicantsApiResponse>(`${this.apiUrl}/get_applicants.php?jobId=${jobID}`);
  }

  withdrawJob(userID: number, jobID: number): Observable<WithdrawJobApiResponse> {
    return this.http.post<WithdrawJobApiResponse>(`${this.apiUrl}/withdraw_job.php`, 
      { UserID: userID, JobID: jobID });
  }

  getWithdrawnJobs(userID: number): Observable<WithdrawnJobsApiResponse[]> {
    return this.http.get<WithdrawnJobsApiResponse[]>(`${this.apiUrl}get_withdrawn_jobs.php?userID=${userID}`);
  } 
  
  sendVerificationCode(email: string): Observable<ForgotPasswordResponse> {
    return this.http.post<ForgotPasswordResponse>(
      `${this.apiUrl}/forgot_password.php`, { email }
    );
  }
}
