import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {CategoryService} from "../../services/category.service";
import {Observable} from "rxjs";
import {Category} from "../../model/category";

@Component({
  selector: 'app-page-size',
  templateUrl: './page-size.component.html',
  styleUrl: './page-size.component.css'
})
export class PageSizeComponent implements OnInit{
  category$: Observable<Category[]> | undefined;

  @Output()
  sizeValue = new EventEmitter<string>();

  @Output()
  sortBy = new EventEmitter<string>();

  @Output()
  filter_category_id = new EventEmitter<string>();

  @Input()
  onSearchMode = false;

  constructor(private categoryService: CategoryService) {

  }

  onSelectedSize(value: string) {
    this.sizeValue.emit(value);
  }

  onSelectedSortBy(value: string) {
    this.sortBy.emit(value);
  }

  ngOnInit(): void {
    this.category$ = this.categoryService.getAllCategories();
  }

  onSelectedFilter(value: string) {
    this.filter_category_id.emit(value);
  }
}
