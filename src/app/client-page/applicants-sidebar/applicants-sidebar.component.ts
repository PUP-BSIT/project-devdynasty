import { Component, Input, OnChanges, Inject} from '@angular/core';

@Component({
  selector: 'app-applicants-sidebar',
  templateUrl: './applicants-sidebar.component.html',
  styleUrl: './applicants-sidebar.component.css'
})
export class ApplicantsSidebarComponent implements OnChanges{
  @Input() applicants: any[] = [];
  @Input() jobTitle: string = '';
  groupedApplicants: any[] = [];
  selectedApplicant: any = null;

  ngOnChanges() {
    this.groupApplicantsByDate();
  }

  groupApplicantsByDate() {
    const groups = this.applicants.reduce((acc, applicant) => {
      const date = applicant.ApplicationDate;
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(applicant);
      return acc;
    }, {});

    this.groupedApplicants = Object.keys(groups).map(date => ({
      date,
      applicants: groups[date]
    }));
  }

  viewProfile(applicant: any): void {
    this.selectedApplicant = applicant;
  }

  closeProfileModal(): void {
    this.selectedApplicant = null;
  }

}
