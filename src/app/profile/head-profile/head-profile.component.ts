import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { UserDetailsResponse } from '../../../model/user_details_api_response';

@Component({
  selector: 'app-head-profile',
  templateUrl: './head-profile.component.html',
  styleUrl: './head-profile.component.css'
})
export class HeadProfileComponent implements OnChanges {
  @Input() dataFromParent!: UserDetailsResponse;
  profileImageUrl!: string;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['dataFromParent'] && changes['dataFromParent'].currentValue) {
      this.dataFromParent = changes['dataFromParent'].currentValue;
      this.profileImageUrl = `http://localhost/pup_connect_backend/${
        this.dataFromParent.data?.profile_picture}`
    }
  }
}
