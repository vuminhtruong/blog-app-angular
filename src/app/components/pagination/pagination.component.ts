import {Component, Input, OnInit, Output, EventEmitter, OnChanges, SimpleChanges} from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.css'
})
export class PaginationComponent implements OnInit, OnChanges{
  @Input()
  postLength: string = '1';

  totalPosts: number = 1;

  @Input()
  pageSize: string = '5';

  pagePaginator: number[] = [];
  activePage: string = '';
  firstPage = true;
  lastPage = false;

  @Output() page = new EventEmitter<string>();

  ngOnInit(): void {
    this.totalPosts = Math.ceil(parseInt(this.postLength) / parseInt(this.pageSize));
    this.pagePaginator = Array(this.totalPosts).fill(0).map((x,i) => i + 1);
    this.activePage = '1';
  }

  setActive(pageNumber: string) {
    this.activePage = pageNumber;
    this.checkPage(pageNumber);
    this.page.emit(pageNumber);
  }

  isActive(pageNumber: string) {
    return this.activePage === pageNumber;
  }

  onPrevious() {
    this.activePage = (parseInt(this.activePage) - 1).toString();
    this.checkPage(this.activePage);
    this.page.emit(this.activePage);
  }

  onNext() {
    this.activePage = (parseInt(this.activePage) + 1).toString();
    this.checkPage(this.activePage);
    this.page.emit(this.activePage);
  }

  checkPage(pageNumber: string) {
    this.firstPage = pageNumber === '1';
    this.lastPage = this.totalPosts.toString() === pageNumber;
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.totalPosts = Math.ceil(parseInt(this.postLength) / parseInt(this.pageSize));
    this.pagePaginator = Array(this.totalPosts).fill(0).map((x,i) => i + 1);
    this.page.emit('1');
    this.activePage = '1';
  }
}
