import {Component, Inject, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Observable} from "rxjs";
import {Post} from "../../model/post";
import {PostService} from "../../services/post.service";
import {CategoryService} from "../../services/category.service";

@Component({
  selector: 'app-blog-card',
  templateUrl: './blog-card.component.html',
  styleUrl: './blog-card.component.css'
})
export class BlogCardComponent implements OnInit {
  allPosts$: Observable<Post[]> | undefined;
  posts$: Observable<Post[]> | undefined;
  pageSize = '5';
  pageNo: string = '0';
  sortBy: string = 'title';
  filter_category_id = '';
  onFilterMode = false;

  constructor(private postService: PostService) {
  }

  ngOnInit() {
    this.allPosts$ = this.postService.getAllPostsWithOutPageSize();
    this.posts$ = this.postService.getPostsWithPageSize(this.pageSize, this.pageNo, this.sortBy);
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
    if (this.onFilterMode) {
      this.posts$ = this.postService.getPostsByCategory(this.filter_category_id, this.pageSize, this.pageNo, this.sortBy);
    } else {
      this.posts$ = this.postService.getPostsWithPageSize(this.pageSize, this.pageNo, this.sortBy);
    }
  }

  getFilterCategory(filter_category_id: string) {
    this.filter_category_id = filter_category_id;
    this.onFilterMode = true;
    if (this.filter_category_id !== '') {
      if (this.filter_category_id === '-1') {
        this.allPosts$ = this.postService.getAllPostsWithOutPageSize();
        this.posts$ = this.postService.getPostsWithPageSize(this.pageSize, this.pageNo, this.sortBy);
        this.onFilterMode = false;
      } else {
        this.allPosts$ = this.postService.getAllPostsByCategory(this.filter_category_id);
        this.posts$ = this.postService.getPostsByCategory(this.filter_category_id, this.pageSize, this.pageNo, this.sortBy);
      }
    }
  }

  onReloadPage() {
    this.getFilterCategory('-1');
  }
}
