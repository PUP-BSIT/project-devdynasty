import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';

@Component({
  selector: 'app-signupform',
  templateUrl: './signupform.component.html',
  styleUrls: ['./signupform.component.css']
})
export class SignupformComponent implements OnInit {
  signupForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.signupForm = this.fb.group({
      name: ['', [Validators.required, this.noNumbersValidator()]],
      email: ['', 
        [
          Validators.required,
          Validators.email,
          this.emailDomainValidator('@iskolarngbayan.pup.edu.ph')
        ]],
      password: ['', 
        [
          Validators.required,
          Validators.minLength(8),
          this.passwordStrengthValidator()
        ]],
      confirmPassword: ['', Validators.required]
    }, { validator: this.passwordMatchValidator });
  }

  noNumbersValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      const hasNumber = /\d/.test(value);
      return hasNumber ? { noNumbers: true } : null;
    };
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

  passwordStrengthValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const password = control.value;
      const hasLowerCase = /[a-z]/.test(password);
      const hasUpperCase = /[A-Z]/.test(password);
      const hasNumber = /\d/.test(password);
      const hasSpecialCharacter = /[!@#$%^&*]/.test(password);
      
      const valid = hasLowerCase && hasUpperCase && hasNumber 
                      && hasSpecialCharacter;
  
      if (!valid) {
        return {
          passwordStrength: {
            hasLowerCase,
            hasUpperCase,
            hasNumber,
            hasSpecialCharacter
          }
        };
      }
      return null;
    };
  }

  passwordMatchValidator(form: FormGroup): ValidationErrors | null {
    const password = form.get('password')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { mismatch: true };
  }

  get nameControl() {
    return this.signupForm.get('name')!;
  }

  get emailControl() {
    return this.signupForm.get('email')!;
  }

  get passwordControl() {
    return this.signupForm.get('password')!;
  }

  get confirmPasswordControl() {
    return this.signupForm.get('confirmPassword')!;
  }

  onSubmit(): void {
    if (this.signupForm.valid) {
      console.log('Form Submitted', this.signupForm.value);
    }
  }
}
