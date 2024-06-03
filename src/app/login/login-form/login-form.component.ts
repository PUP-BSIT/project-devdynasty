import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder, ValidatorFn } from '@angular/forms';
import { AbstractControl, ValidationErrors } from '@angular/forms';
import { UserService } from '../../../service/user.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.css'
})
export class LoginFormComponent implements OnInit{
  loginForm!: FormGroup;

  constructor (private fb: FormBuilder, private userService: UserService, private _snackBar: MatSnackBar, private router: Router) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', 
        [
         Validators.required, 
         Validators.email,
         this.emailDomainValidator('@iskolarngbayan.pup.edu.ph')
        ]],
      password: ['', [Validators.required, this.passwordValidator()]]
    });
  }

  emailDomainValidator(domain: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const email = control.value;
      const domainPattern = new RegExp(`${domain}$`);
      if (email && !domainPattern.test(email)) {
        return { emailDomain: true };
      }
      return null;
    };
  }

  passwordValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const password = control.value;
      if (!password) {
        return { required: true };
      }
      return null;
    };
  }

  get emailControl() {
    return this.loginForm.get('email')!;
  }

  get passwordControl() {
    return this.loginForm.get('password')!;
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      console.log('Form Submitted', this.loginForm.value);
      const user = this.loginForm.value;
      this.userService.loginUser(user).subscribe(response => {
        console.log(response);
        this.loginForm.reset();
        if (response.status === 'success') {
          this.userService.setLoginStatus(true);
          this._snackBar.open(response.message, 'Close', {
            duration: 5000,
          });
          this.router.navigate(['/profile-setup']);
        }
        else {
          this._snackBar.open(response.message, 'Close', {
            duration: 5000,
          });
          this.router.navigate(['/login']);
        }
      })
    }
  }
}
