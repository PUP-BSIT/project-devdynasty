import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

@Component({
  selector: 'app-applicant-profile-modal',
  templateUrl: './applicant-profile-modal.component.html',
  styleUrl: './applicant-profile-modal.component.css'
})
export class ApplicantProfileModalComponent implements OnInit{
  @Input() applicant: any;
  @Output() closeModal = new EventEmitter<void>();
  applicantProfilePhoto!: string | undefined;

  ngOnInit(){
    this.applicantProfilePhoto = 
      `https://pupconnect.online/pup_connect_backend/${this.applicant.profile_picture}`;
  }

  close() {
    this.closeModal.emit();
  }
}
