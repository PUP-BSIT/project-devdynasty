import { Component, OnInit, OnDestroy, TemplateRef, ViewChild } from '@angular/core';
import { UserService } from '../../../service/user.service';
import { Subscription } from 'rxjs';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-job-list',
  templateUrl: './job-list.component.html',
  styleUrls: ['./job-list.component.css']
})
export class JobListComponent implements OnInit, OnDestroy{
  jobs: any = [];
  userId!: number;
  searchTermSubscription: Subscription = new Subscription();

  @ViewChild('jobDialogTemplate') jobDialogTemplate!: TemplateRef<any>;
  dialogRef!: MatDialogRef<any>;

  constructor(private userService: UserService, public dialog: MatDialog, 
    private _snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.userId = this.userService.userID;
    this.searchTermSubscription = this.userService.searchTerm$.subscribe(({ term, jobType }) => {
      this.searchJobs(term, jobType);
    });
    this.fetchJobs();
  }

  fetchJobs(): void {
    this.userService.getJobs(this.userId).subscribe(data => {
      this.jobs = data;
    });
  }

  searchJobs(term: string, jobType: string): void {
    this.userService.searchJobs(term, jobType, this.userId).subscribe(data => {
      this.jobs = data;
      console.log(this.jobs);
    });
  }

  openJobPostDialog(job: any, target: EventTarget | null): void {
    if (target instanceof HTMLButtonElement) {
      target.classList.add('clicked');
    }
    this.dialogRef = this.dialog.open(this.jobDialogTemplate, {
      width: '700px',
      height: '470px',
      data: { job }
    });
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  onApplyClick(jobid: number): void {
    const jobId = jobid;
    const userId = this.userService.userID;

    this.userService.createApplication(jobId, userId).subscribe(response => {
      if (response.status === 'success') {
        this._snackBar.open("Application Sent", 'Close', {
          duration: 5000,
        });
        this.fetchJobs();
      } else {
        this._snackBar.open("There's something wrong", 'Close', {
          duration: 5000,
        });
      }
    })
  }

  ngOnDestroy(): void {
    this.searchTermSubscription.unsubscribe();
  }
}