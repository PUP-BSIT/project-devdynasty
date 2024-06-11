import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrl: './edit-profile.component.css'
})
export class EditProfileComponent implements OnInit {
  editProfileForm!: FormGroup;
  selectedFile: File | undefined;

  constructor(private userService: UserService, private route: ActivatedRoute, 
    private formBuilder: FormBuilder, private _snackBar: MatSnackBar,
    private router: Router) {}
  
    ngOnInit(): void {
      this.editProfileForm = this.formBuilder.group({
        profilePicture: ['', [Validators.required, fileSizeValidator(5)]],
        description: ['', Validators.required],
        location: ['', Validators.required],
        phoneNumber: ['', Validators.required],
        skills: ['', Validators.required]
      });
    }

    onFileSelected(event: any) {
      this.selectedFile = event.target.files[0] as File;
    }

    onSubmit() {
      console.log(this.editProfileForm.value);
    }
}
