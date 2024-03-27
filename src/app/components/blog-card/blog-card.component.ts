import {Component, Inject, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {Post} from "../../model/post";
import {PostService} from "../../services/post.service";

@Component({
  selector: 'app-blog-card',
  templateUrl: './blog-card.component.html',
  styleUrl: './blog-card.component.css'
})
export class BlogCardComponent implements OnInit{
  allPosts$: Observable<Post[]> | undefined;
  posts$: Observable<Post[]> | undefined;
  pageSize = '5';
  pageNo: string = '0';
  sortBy: string = 'title';

  constructor(private postService: PostService) {
  }

  ngOnInit() {
    this.allPosts$ = this.postService.getAllPostsWithOutPageSize();
    this.posts$ = this.postService.getPostsWithPageSize(this.pageSize, this.pageNo, this.sortBy);
  }

  protected readonly Math = Math;

  setPageNumber(page: string) {
    this.pageNo = (parseInt(page) - 1).toString();
    this.posts$ = this.postService.getPostsWithPageSize(this.pageSize, this.pageNo, this.sortBy);
  }

  protected readonly parseInt = parseInt;

  getPageSize(size: string) {
    this.pageSize = size;
    this.posts$ = this.postService.getPostsWithPageSize(this.pageSize, this.pageNo, this.sortBy);
  }

  getSortBy(sortBy: string) {
    this.sortBy = sortBy;
    this.posts$ = this.postService.getPostsWithPageSize(this.pageSize, this.pageNo, this.sortBy);
  }
}
