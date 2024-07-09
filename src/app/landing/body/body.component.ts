import { Component, OnInit, Renderer2 } from '@angular/core';
import { ActiveLinkService } from '../../../service/active-link.service';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css']
})
export class BodyComponent implements OnInit {
  activeLink = 'home';

  constructor(private activeLinkService: ActiveLinkService,
     private renderer: Renderer2) {}

  ngOnInit() {
    this.activeLinkService.activeLink$.subscribe(link => {
      this.activeLink = link;
      this.addFadeClass();
    });
  }

  addFadeClass() {
    const container = document.querySelector('.page-container');
    this.renderer.addClass(container, 'fade-in');
    setTimeout(() => {
      this.renderer.removeClass(container, 'fade-in');
    }, 1500); // Duration should match the animation duration
  }
}
