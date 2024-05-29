import { Component } from '@angular/core';

@Component({
  selector: 'app-signupform',
  templateUrl: './signupform.component.html',
  styleUrl: './signupform.component.css'
})
export class SignupformComponent {
  onSubmit() {
    alert('Form Submitted!');
  }
}
