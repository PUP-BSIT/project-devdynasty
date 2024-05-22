import { Component, OnInit } from '@angular/core';
import { ActiveLinkService } from '../../../service/active-link.service';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css']
})
export class BodyComponent implements OnInit {
  activeLink = 'home';

  constructor(private activeLinkService: ActiveLinkService) {}

  ngOnInit() {
    this.activeLinkService.activeLink$.subscribe(link => {
      this.activeLink = link;
    });
  }
}
