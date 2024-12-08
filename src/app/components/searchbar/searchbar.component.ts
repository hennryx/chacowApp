import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'Searchbar',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './searchbar.component.html',
  styleUrl: './searchbar.component.css'
})
export class SearchbarComponent {
  @Output() searchValue: EventEmitter<string> = new EventEmitter<string>()
  searchText: string = "";

  returnSearch(event: Event) {
    if (this.searchText.trim()) {
      event.preventDefault();
      this.searchValue.emit(this.searchText)
    }
  }
}
