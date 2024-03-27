import {Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-page-size',
  templateUrl: './page-size.component.html',
  styleUrl: './page-size.component.css'
})
export class PageSizeComponent {
  @Output()
  sizeValue = new EventEmitter<string>();

  @Output()
  sortBy = new EventEmitter<string>();


  onSelectedSize(value: string) {
    this.sizeValue.emit(value);
  }

  onSelectedSortBy(value: string) {
    this.sortBy.emit(value);
  }
}
