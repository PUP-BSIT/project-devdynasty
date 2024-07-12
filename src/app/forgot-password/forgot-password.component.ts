import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../service/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  forgotPasswordForm!: FormGroup;
  otpForm!: FormGroup;
  newPasswordForm!: FormGroup;
  userEmail = '';

  isButtonDisabled: boolean = false;
  isModalVisible: boolean = false;
  isForgotPasswordForm = true;
  isResetPasswordModalVisible = false;
  countdown: number = 0;
  readonly cooldownTime: number = 60;
  hasAttemptedToSend: boolean = false;

  hideNewPassword = true;
  hideConfirmPassword = true;

  constructor(private fb: FormBuilder, private userService: UserService, private _snackBar: MatSnackBar, private router: Router) {}

  ngOnInit(): void {
    this.initializeForms();
  }

  initializeForms(): void {
    this.forgotPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email, this.emailDomainValidator('@iskolarngbayan.pup.edu.ph')]]
    });

    this.otpForm = this.fb.group({
      otp1: ['', [Validators.required, Validators.maxLength(1)]],
      otp2: ['', [Validators.required, Validators.maxLength(1)]],
      otp3: ['', [Validators.required, Validators.maxLength(1)]],
      otp4: ['', [Validators.required, Validators.maxLength(1)]],
      otp5: ['', [Validators.required, Validators.maxLength(1)]],
      otp6: ['', [Validators.required, Validators.maxLength(1)]]
    });

    this.newPasswordForm = this.fb.group({
      email: [{ value: this.userEmail, disabled: false }, [Validators.required, Validators.email]], // Allow the email field to be included in form value
      newPassword: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required]]
    }, { validator: this.passwordMatchValidator });
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

  passwordMatchValidator(form: FormGroup) {
    return form.get('newPassword')?.value === form.get('confirmPassword')?.value ? null : { mismatch: true };
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
        this.isModalVisible = true;
        this._snackBar.open(response.message, 'Close', {
          duration: 5000,
        });
        return;
      }
      if (response.message === 'Email address not found') {
        this._snackBar.open(response.message, 'Close', {
          duration: 5000,
        });
        return;
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

  limitInputLength(event: KeyboardEvent, nextControlName: string | null) {
    const input = event.target as HTMLInputElement;
    if (input.value.length === 1 && nextControlName) {
      const nextInput = document.querySelector(`[formControlName="${nextControlName}"]`) as HTMLInputElement;
      if (nextInput) {
        nextInput.focus();
      }
    }
  }

  onOtpSubmit() {
    if (!this.otpForm.valid) {
      return;
    }

    const otp = Object.values(this.otpForm.value).join('');
    console.log(otp);

    this.userService.verifyVerificationCode(otp).subscribe(response => {
      if (response.status === 'error') {
        this._snackBar.open(response.message, 'Close', {
          duration: 5000,
        });
        this.otpForm.reset();
        return;
      }
      this._snackBar.open('Successful', 'Close', {
        duration: 5000,
      });
      this.userEmail = response.message;
      this.initializeForms();
      this.otpForm.reset();
      this.isResetPasswordModalVisible = true;
      this.isForgotPasswordForm = false;
      this.isModalVisible = false;
    });
  }

  onChangePasswordSubmit(): void {
    if (!this.newPasswordForm.valid) {
      console.log(this.newPasswordForm.value);
      return;
    }

    const newPassword = this.newPasswordForm.get('newPassword')?.value;
    const email = this.newPasswordForm.get('email')?.value; // Ensure email is retrieved correctly

    this.userService.changeUserPassword(email, newPassword).subscribe(response => {
      if (response.status === 'error') {
        this._snackBar.open(response.message, 'Close', {
          duration: 5000,
        });
        console.log(this.newPasswordForm.value);
        this.newPasswordForm.reset();
        return;
      }

      this._snackBar.open('Password Changed Successfully', 'Close', {
        duration: 5000,
      });
      this.newPasswordForm.reset();
      this.router.navigate(['/login']);
    });
  }
}
