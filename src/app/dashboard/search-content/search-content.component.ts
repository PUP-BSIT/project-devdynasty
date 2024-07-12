import { Component } from '@angular/core';
import { UserService } from '../../../service/user.service';
import { MatSelectChange } from '@angular/material/select';

@Component({
  selector: 'app-search-content',
  templateUrl: './search-content.component.html',
  styleUrl: './search-content.component.css'
})
export class SearchContentComponent{
  selectedJobType: string = '';

  constructor(private userService: UserService) { }

  onSearch(event: Event): void {
    const target = event.target as HTMLInputElement;
    const searchTerm = target.value;
    this.userService.setSearchTerm(searchTerm, this.selectedJobType);
  }

  onFilterChange(event: MatSelectChange): void {
    this.selectedJobType = event.value;
    this.userService.setSearchTerm('', this.selectedJobType);   
  }
}