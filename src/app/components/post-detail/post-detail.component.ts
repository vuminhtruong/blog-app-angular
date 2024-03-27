import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {PostService} from "../../services/post.service";
import {ActivatedRoute} from "@angular/router";
import {Post} from "../../model/post";
import {EMPTY, map, Observable} from "rxjs";
import {Comment} from "../../model/comment";
import {CommentService} from "../../services/comment.service";
import {Category} from "../../model/category";
import {CategoryService} from "../../services/category.service";

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrl: './post-detail.component.css'
})
export class PostDetailComponent implements OnInit, OnDestroy {
  postId!: string;
  private sub1: any;
  private sub2: any;
  post$!: Observable<Post>;
  comments$: Observable<Comment[]> | undefined;
  category: string | undefined;
  category$: Observable<Category> | undefined;

  constructor(private activeRoute: ActivatedRoute,
              private postService: PostService,
              private commentService: CommentService,
              private categoryService: CategoryService) {

  }

  ngOnInit(): void {
    this.sub1 = this.activeRoute.params.subscribe(param => {
      this.postId = param['id'];
    })

    this.sub2 = this.activeRoute.queryParams.subscribe(params => {
      this.category = params['category'];
    })

    if (this.postId) {
      this.post$ = this.postService.getPostById(this.postId);
      this.comments$ = this.commentService.getCommentsOfPost(this.postId);
    } else {
      this.post$ = EMPTY;
    }

    if(this.category) {
      this.category$ = this.categoryService.getCategoryById(BigInt(this.category));
    }
  }

  ngOnDestroy(): void {
    this.sub1.unsubscribe();
    this.sub2.unsubscribe();
  }
}
