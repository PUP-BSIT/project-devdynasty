import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors,
               ValidatorFn } from '@angular/forms';
import { UserService } from '../../service/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css'
})
export class ForgotPasswordComponent implements OnInit {
  forgotPasswordForm!: FormGroup;

  isButtonDisabled: boolean = false;
  countdown: number = 0;
  readonly cooldownTime: number = 60;
  hasAttemptedToSend: boolean = false;

  constructor(private fb: FormBuilder, private userService: UserService,
                private _snackBar: MatSnackBar) {}
  
  ngOnInit(): void {
    this.forgotPasswordForm = this.fb.group({
      email: [
        '',
        [
          Validators.required, 
          Validators.email, 
          this.emailDomainValidator('@iskolarngbayan.pup.edu.ph')
        ]
      ]
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

  get email() {
    return this.forgotPasswordForm.get('email');
  }

  onSubmit() {
    if (!this.forgotPasswordForm.valid) {
      console.log('Form is invalid');
      return;
    }
    const email = this.forgotPasswordForm.value.email;

    this._snackBar.open('Please wait...', 'Close', {
      duration: 5000,
    });

    this.userService.sendVerificationCode(email).subscribe((response) => {
      if (response.status === 'success') {
        this.startCountdown();
        this.hasAttemptedToSend = true;
        this._snackBar.open(response.message, 'Close', {
          duration: 5000,
        });
        return
      }
      if (response.message === 'Email address not found') {
        this._snackBar.open(response.message, 'Close', {
          duration: 5000,
        });
        return
      }
      this._snackBar.open('Something went wrong.', 'Close', {
        duration: 5000,
      });
    });
  }

  startCountdown() {
    this.isButtonDisabled = true;
    this.countdown = this.cooldownTime;
    const interval = setInterval(() => {
      this.countdown--;
      if (this.countdown <= 0) {
        clearInterval(interval);
        this.isButtonDisabled = false;
      }
    }, 1000);
  }
}
