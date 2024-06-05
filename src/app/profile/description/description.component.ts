import { Component, OnChanges, SimpleChanges, Input } from '@angular/core';
import { UserDetailsResponse } from '../../../model/user_details_api_response';

@Component({
  selector: 'app-description',
  templateUrl: './description.component.html',
  styleUrl: './description.component.css'
})
export class DescriptionComponent implements OnChanges {
  @Input() dataFromParent!: UserDetailsResponse;
  skills: string[] = [];

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['dataFromParent'] && changes['dataFromParent'].currentValue) {
      this.dataFromParent = changes['dataFromParent'].currentValue;

      this.skills = this.dataFromParent.data!.skills.split(', ');
    }
  }
}
