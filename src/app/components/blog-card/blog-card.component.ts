import {AfterContentChecked, Component, OnInit} from '@angular/core';
import {Observable, of} from "rxjs";
import {Post} from "../../model/post";
import {PostService} from "../../services/post.service";

@Component({
  selector: 'app-blog-card',
  templateUrl: './blog-card.component.html',
  styleUrl: './blog-card.component.css'
})
export class BlogCardComponent implements OnInit, AfterContentChecked {
  allPosts$: Observable<Post[]> | undefined;
  posts$: Observable<Post[]> | undefined;
  pageSize = '5';
  pageNo: string = '0';
  sortBy: string = 'title';
  filter_category_id = '';
  onFilterMode = false;
  inputSearch: string | undefined;
  postAll: Post[] = [];
  onSearchMode: boolean = false;

  constructor(private postService: PostService) {

  }

  ngOnInit() {
    this.allPosts$ = this.postService.getAllPostsWithOutPageSize();
    this.posts$ = this.postService.getPostsWithPageSize(this.pageSize, this.pageNo, this.sortBy);
    this.postService.fetchInputSearch().subscribe(value => this.inputSearch = value);
    this.postService.fetchAllPost().subscribe(value => this.postAll = value);
  }

  setPageNumber(page: string) {
    this.pageNo = (parseInt(page) - 1).toString();
    if (this.onFilterMode) {
      this.posts$ = this.postService.getPostsByCategory(this.filter_category_id, this.pageSize, this.pageNo, this.sortBy);
    } else {
      this.posts$ = this.postService.getPostsWithPageSize(this.pageSize, this.pageNo, this.sortBy);
    }
  }

  getPageSize(size: string) {
    this.pageSize = size;
    if (this.onFilterMode) {
      this.posts$ = this.postService.getPostsByCategory(this.filter_category_id, this.pageSize, this.pageNo, this.sortBy);
    } else {
      this.posts$ = this.postService.getPostsWithPageSize(this.pageSize, this.pageNo, this.sortBy);
    }
  }

  getSortBy(sortBy: string) {
    this.sortBy = sortBy;
    if (this.onSearchMode) {
      this.posts$ = of(this.sortArray(this.postAll, sortBy));
    } else {
      if (this.onFilterMode) {
        this.posts$ = this.postService.getPostsByCategory(this.filter_category_id, this.pageSize, this.pageNo, this.sortBy);
      } else {
        this.posts$ = this.postService.getPostsWithPageSize(this.pageSize, this.pageNo, this.sortBy);
      }
    }
  }

  getFilterCategory(filter_category_id: string) {
    this.filter_category_id = filter_category_id;
    this.onFilterMode = true;
    if (this.filter_category_id === '-1') {
      this.allPosts$ = this.postService.getAllPostsWithOutPageSize();
      this.posts$ = this.postService.getPostsWithPageSize(this.pageSize, this.pageNo, this.sortBy);
      this.onFilterMode = false;
    } else {
      this.allPosts$ = this.postService.getAllPostsByCategory(this.filter_category_id);
      this.posts$ = this.postService.getPostsByCategory(this.filter_category_id, this.pageSize, this.pageNo, this.sortBy);
    }
  }

  onReloadPage() {
    this.getFilterCategory('-1');
  }

  ngAfterContentChecked(): void {
    if (this.inputSearch !== '') {
      this.allPosts$ = of(this.postAll);
      this.posts$ = of(this.paginate(this.postAll, this.pageSize, this.pageNo));
      this.onSearchMode = true;
    } else {

    }
  }

  paginate(array: any[], page_size: string, page_number: string) {
    let size = parseInt(page_size);
    let number = parseInt(page_number) + 1;
    return array.slice((number - 1) * size, number * size);
  }

  sortArray(array: Post[], sortBy: string) {
    if (sortBy == 'title') {
      return array.sort((a, b) => a.id - b.id);
    } else if (sortBy == 'content') {
      return array.sort((a, b) => a.content.length - b.content.length)
    } else {
      return array.sort((a, b) => a.description.length - b.description.length)
    }
  }

  // private filterArray(postAll: Post[], filter_category_id: string) {
  //   if (filter_category_id == '-1') {
  //     return postAll;
  //   } else {
  //     return postAll.filter(post => post.categoryId.toString() == filter_category_id);
  //   }
  // }
}
