import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../service/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserDetailsResponse } from '../../model/user_details_api_response'; 

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
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrl: './edit-profile.component.css'
})
export class EditProfileComponent implements OnInit {
  editProfileForm!: FormGroup;
  selectedFile: File | undefined;
  userDetails?: UserDetailsResponse;
  profileImageUrl: string | undefined;

  constructor(private userService: UserService, private route: ActivatedRoute, 
    private formBuilder: FormBuilder, private _snackBar: MatSnackBar,
    private router: Router) {}
  
    ngOnInit(): void {
      this.editProfileForm = this.formBuilder.group({
        profilePicture: [this.userDetails?.data?.profile_picture, 
          fileSizeValidator(5)],
        description: [''],
        location: [''],
        phoneNumber: [''],
        skills: ['']
      });

      console.log(this.editProfileForm);
      
      const userid = this.userService.userID;
      this.userService.getUserDetails(userid).subscribe((response) => {
        this.userDetails = response;
        this.profileImageUrl = this.getProfileImageUrl(
          this.userDetails?.data?.profile_picture);
        this.setFormValues();
        this.editProfileForm.updateValueAndValidity();
        console.log(this.userDetails);
      });
    }

    setFormValues(): void {
      if (this.userDetails) {
        this.editProfileForm.patchValue({
          description: this.userDetails?.data?.description,
          location: this.userDetails?.data?.location,
          phoneNumber: this.userDetails?.data?.phone_number,
          skills: this.userDetails?.data?.skills
        });

        if (this.userDetails.data!.profile_picture) {
          this.editProfileForm.get('profilePicture')?.setValue(
            this.userDetails!.data!.profile_picture
          );
        }

        this.editProfileForm.updateValueAndValidity();
      }
      console.log(this.editProfileForm.value);
    }

    getProfileImageUrl(profilePicture: string | undefined): string {
      return `http://localhost/pup_connect_backend/${profilePicture}`;
    }

    onFileSelected(event: any) {
      this.selectedFile = event.target.files[0] as File;
      this.editProfileForm.patchValue({ profilePicture: this.selectedFile });
      this.editProfileForm.get('profilePicture')?.updateValueAndValidity();
    }

    formDataToObject(formData: FormData): any {
      const obj: any = {};
      formData.forEach((value, key) => {
        obj[key] = value;
      });
      return obj;
    }

    onSubmit() {
      if (this.editProfileForm.valid) {
        const formData = new FormData();
        formData.append('userID', this.userService.userID.toString());
        if (this.selectedFile) {
          formData.append('profilePicture', this.selectedFile);
        } else {
          formData.append('profilePicture', 
            this.userDetails?.data?.profile_picture || '');
        }
        formData.append('description', this.editProfileForm.value.description);
        formData.append('location', this.editProfileForm.value.location);
        formData.append('phoneNumber', this.editProfileForm.value.phoneNumber);
        formData.append('skills', this.editProfileForm.value.skills);

        console.log(this.formDataToObject(formData));

        this.userService.editProfile(formData).subscribe(response => {
          console.log(response);
          const message = response.message;
          if (message === 'Profile updated successfully.') {
            this.router.navigate(['/profile'])
            this._snackBar.open("Profile Updated", 'Close', {
              duration: 5000,
            });
          } 
          else {
            this._snackBar.open(message, 'Close', {
              duration: 5000,
            });
          }
        });
      } else {
        this._snackBar.open("Invalid", 'Close', {
          duration: 5000,
        });
      }
    }
}
