import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule, MatSelectionList } from '@angular/material/list';
import { MatDialogModule } from '@angular/material/dialog';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { UserService } from '../service/user.service';
import { ActiveLinkService } from '../service/active-link.service';

import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeaderDashboardComponent } from './dashboard/header-dashboard/header-dashboard.component';
import { SidebarComponent } from './dashboard/sidebar/sidebar.component';
import { JobListComponent } from './dashboard/job-list/job-list.component';
import { SearchContentComponent } from './dashboard/search-content/search-content.component';
import { LandingComponent } from './landing/landing.component';
import { HeaderComponent } from './landing/header/header.component';
import { BodyComponent } from './landing/body/body.component';
import { LoginComponent } from './login/login.component';
import { LoginFormComponent } from './login/login-form/login-form.component';
import { SignupSectionComponent } from './login/signup-section/signup-section.component';
import { ProfileComponent } from './profile/profile.component';
import { DescriptionComponent } from './profile/description/description.component';
import { HeadProfileComponent } from './profile/head-profile/head-profile.component';
import { ProfileHeaderComponent } from './profile/profile-header/profile-header.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { SignupformComponent } from './sign-up/signupform/signupform.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { AppliedPageComponent } from './applied-page/applied-page.component';
import { AppliedJobListComponent } from './applied-page/applied-job-list/applied-job-list.component';
import { ProfileSetupPageComponent } from './profile-setup-page/profile-setup-page.component';
import { ClientPageComponent } from './client-page/client-page.component';
import { JobPostFormComponent } from './client-page/job-post-form/job-post-form.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { JobPostFeedComponent } from './client-page/job-post-feed/job-post-feed.component';
import { EditJobModalComponent } from './client-page/edit-job-modal/edit-job-modal.component';
import { HistoryComponent } from './history/history.component';
import { WithdrawnJobsListComponent } from './history/withdrawn-jobs-list/withdrawn-jobs-list.component';
import { ApplicantsSidebarComponent } from './client-page/applicants-sidebar/applicants-sidebar.component';
import { ApplicantProfileModalComponent } from './client-page/applicant-profile-modal/applicant-profile-modal.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { DeleteConfirmMessageComponent } from './client-page/delete-confirm-message/delete-confirm-message.component';
import { WithdrawConfirmMessageComponent } from './applied-page/withdraw-confirm-message/withdraw-confirm-message.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    HeaderDashboardComponent,
    SidebarComponent,
    JobListComponent,
    SearchContentComponent,
    LandingComponent,
    HeaderComponent,
    BodyComponent,
    LoginComponent,
    LoginFormComponent,
    SignupSectionComponent,
    ProfileComponent,
    DescriptionComponent,
    HeadProfileComponent,
    ProfileHeaderComponent,
    SignUpComponent,
    SignupformComponent,
    AppliedPageComponent,
    AppliedJobListComponent,
    ProfileSetupPageComponent,
    ClientPageComponent,
    JobPostFormComponent,
    EditProfileComponent,
    JobPostFeedComponent,
    EditJobModalComponent,
    HistoryComponent,
    WithdrawnJobsListComponent,
    ApplicantsSidebarComponent,
    ApplicantProfileModalComponent,
    ForgotPasswordComponent,
    DeleteConfirmMessageComponent,
    WithdrawConfirmMessageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatProgressSpinnerModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    MatDialogModule,
    MatToolbarModule,
    MatCardModule,
    MatOptionModule,
    MatSelectModule,
  ],
  providers: [ActiveLinkService, UserService, provideAnimationsAsync()],
  bootstrap: [AppComponent]
})
export class AppModule { }
