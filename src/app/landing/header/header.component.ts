import { Component } from '@angular/core';
import { ActiveLinkService } from '../../../service/active-link.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  constructor(protected activeLinkService: ActiveLinkService) {}

  setActiveLink(link: string) {
    this.activeLinkService.setActiveLink(link);
  }
}
