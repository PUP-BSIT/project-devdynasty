import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AbstractControl, ValidatorFn } from '@angular/forms';
import { UserService } from '../../service/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';

export function fileSizeValidator(maxSize: number): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const file = control.value as File;
    if (file) {
      const fileSize = file.size / (1024 * 1024);
      if (fileSize > maxSize) {
        return { 'fileSizeExceeded': { value: control.value } };
      }
    }
    return null;
  };
}

@Component({
  selector: 'app-profile-setup-page',
  templateUrl: './profile-setup-page.component.html',
  styleUrl: './profile-setup-page.component.css'
})
export class ProfileSetupPageComponent implements OnInit {
  token: string = '';
  profileForm!: FormGroup;
  selectedFile: File | undefined;

  constructor(private userService: UserService, private route: ActivatedRoute, 
      private http: HttpClient, private formBuilder: FormBuilder,
      private _snackBar: MatSnackBar, private router: Router) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.token = params.get('token')!;
      this.verifyToken(this.token);
    });
    this.profileForm = this.formBuilder.group({
      profilePicture: ['', [Validators.required, fileSizeValidator(5)]],
      description: ['', Validators.required],
      location: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      skills: ['', Validators.required]
    });
  }

  verifyToken(token: string): void {
    this.http
      .get(`http://localhost/pup_connect_backend/verify_user.php?token=${token}`)
      .subscribe(response => {
        console.log(response);
    });
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0] as File;
  }

  onSubmit() {
    if (this.profileForm.valid && this.selectedFile) {
      const formData = new FormData();
      formData.append('userToken', this.token);
      formData.append('profilePicture', this.selectedFile);
      formData.append('description', this.profileForm.value.description);
      formData.append('location', this.profileForm.value.location);
      formData.append('phoneNumber', this.profileForm.value.phoneNumber);
      formData.append('skills', this.profileForm.value.skills);

      this.userService.setupProfile(formData).subscribe(response => {
        const message = response.success || response.error;
        this._snackBar.open(message!, 'Close', {
          duration: 5000,
        });
        
        if (response.success) {
          this.router.navigate(['/login']);
        }
        }); 
    } else {
      console.error('Form is invalid or no file selected');
    }
  }
}
