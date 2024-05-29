import { Component } from '@angular/core';

@Component({
  selector: 'app-job-list',
  templateUrl: './job-list.component.html',
  styleUrls: ['./job-list.component.css']
})
export class JobListComponent {
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
    },
    { 
      title: 'SOFTWARE DEVELOPER', 
      company: 'Microsoft Philippines', 
      location: 'Pasay City, Philippines', 
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
    }
  ];
  onApplyClick(event: Event) {
    const button = event.target as HTMLElement;
    button.classList.add('clicked');
  }
}