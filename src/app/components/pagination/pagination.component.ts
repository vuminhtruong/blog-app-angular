import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.css'
})
export class PaginationComponent implements OnInit{
  @Input()
  totalPosts: string = '1';
  pagePaginator: number[] = [];
  activePage: string = '';
  firstPage = true;
  lastPage = false;

  ngOnInit(): void {
    this.pagePaginator = Array(parseInt(this.totalPosts)).fill(0).map((x,i) => i + 1);
    this.activePage = '1';
  }

  setActive(pageNumber: string) {
    this.activePage = pageNumber;
    this.checkPage(pageNumber);
  }

  isActive(pageNumber: string) {
    return this.activePage === pageNumber;
  }

  onPrevious() {
    this.activePage = (parseInt(this.activePage) - 1).toString();
    this.checkPage(this.activePage);
  }

  onNext() {
    this.activePage = (parseInt(this.activePage) + 1).toString();
    this.checkPage(this.activePage);
  }

  checkPage(pageNumber: string) {
    this.firstPage = pageNumber === '1';
    this.lastPage = this.totalPosts === pageNumber;
  }
}
