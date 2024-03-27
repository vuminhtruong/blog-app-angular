import {Component, OnDestroy, OnInit} from '@angular/core';
import {PostService} from "../../services/post.service";
import {ActivatedRoute} from "@angular/router";
import {Post} from "../../model/post";
import {EMPTY, Observable} from "rxjs";
import {Comment} from "../../model/comment";
import {CommentService} from "../../services/comment.service";

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrl: './post-detail.component.css'
})
export class PostDetailComponent implements OnInit, OnDestroy {
  postId!: string;
  private sub: any;
  post$!: Observable<Post>;
  comments$: Observable<Comment[]> | undefined;

  constructor(private activeRoute: ActivatedRoute, private postService: PostService, private commentService: CommentService) {

  }

  ngOnInit(): void {
    this.sub = this.activeRoute.params.subscribe(param => {
      this.postId = param['id'];
    })
    if (this.postId) {
      this.post$ = this.postService.getPostById(this.postId);
      this.comments$ = this.commentService.getCommentsOfPost(this.postId);
    } else {
      this.post$ = EMPTY;
    }
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
