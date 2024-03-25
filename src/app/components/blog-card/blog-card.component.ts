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
  posts$: Observable<Post[]> | undefined;

  constructor(private postService: PostService) {
  }

  ngOnInit() {
    this.posts$ = this.postService.loadPosts();
  }
}
