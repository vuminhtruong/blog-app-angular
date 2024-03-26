import {Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-page-size',
  templateUrl: './page-size.component.html',
  styleUrl: './page-size.component.css'
})
export class PageSizeComponent {
  @Output()
  sizeValue = new EventEmitter<string>();


  onSelected(value: string) {
    this.sizeValue.emit(value);
  }
}
