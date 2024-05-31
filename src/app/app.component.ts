import { Component } from '@angular/core';
import { 
  Router, 
  NavigationStart, 
  NavigationEnd, 
  NavigationCancel, 
  NavigationError } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  isLoading: boolean = false;

  constructor(private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this.isLoading = true;
      } else if (event instanceof NavigationEnd ||
                 event instanceof NavigationCancel || 
                 event instanceof NavigationError) {
        setTimeout(() => {
          this.isLoading = false;
        }, 500);
      }
    });
  }
}
