import { Component } from '@angular/core';

@Component({
  selector: 'app-applied-job-list',
  templateUrl: './applied-job-list.component.html',
  styleUrl: './applied-job-list.component.css'
})
export class AppliedJobListComponent {
  jobs = [
    {
      title: 'SOFTWARE DEVELOPER', 
      company: 'Microsoft Philippines', 
      location: 'BGC, Philippines', 
      salary: '$ 1,000', 
      highlighted: false, 
      icon: 'assets/Job_Page/globe_icon.png', 
      salaryIcon: 'assets/Job_Page/money_icon.png' 
    },
    { 
      title: 'SYSTEM ANALYST', 
      company: 'DTI Philippines', 
      location: 'Pasay City, Philippines', 
      salary: '$ 1,000', 
      highlighted: false, 
      icon: 'assets/Job_Page/globe_icon.png', 
      salaryIcon: 'assets/Job_Page/money_icon.png' 
    },
    {
       title: 'WEB DEVELOPER', 
       company: 'Google Operations, USA', 
       location: 'Taguig City, Philippines', 
       salary: '$ 1,000', 
       highlighted: true, 
       icon: 'assets/Job_Page/globe_icon.png', 
       salaryIcon: 'assets/Job_Page/money_icon.png' 
    }
  ];
}
