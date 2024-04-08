import {AfterContentChecked, AfterContentInit, Component, DoCheck, Input, OnDestroy, OnInit} from '@angular/core';
import {PostService} from "../../services/post.service";
import {ActivatedRoute} from "@angular/router";
import {Post} from "../../model/post";
import {EMPTY, map, Observable} from "rxjs";
import {Comment} from "../../model/comment";
import {CommentService} from "../../services/comment.service";
import {Category} from "../../model/category";
import {CategoryService} from "../../services/category.service";
import {MatDialog} from "@angular/material/dialog";
import {CommentDialogComponent} from "../../dialog/comment-dialog/comment-dialog.component";
import {UserService} from "../../services/user.service";
import {User} from "../../model/user";
import {DeleteDialogComponent} from "../../dialog/delete-dialog/delete-dialog.component";
import {EditPostDialogComponent} from "../../dialog/edit-post-dialog/edit-post-dialog.component";
import {faAdd} from "@fortawesome/free-solid-svg-icons";
import {AddImageDialogComponent} from "../../dialog/add-image-dialog/add-image-dialog.component";

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrl: './post-detail.component.css'
})
export class PostDetailComponent implements OnInit {
  iconAdd = faAdd;
  postId!: string;
  post$!: Observable<Post>;
  comments$: Observable<Comment[]> | undefined;
  category: string | undefined;
  category$: Observable<Category> | undefined;

  constructor(private activeRoute: ActivatedRoute,
              private postService: PostService,
              private commentService: CommentService,
              private categoryService: CategoryService,
              public dialog: MatDialog) {

  }


  ngOnInit(): void {
    this.activeRoute.params.subscribe(param => {
      this.postId = param['id'];
    })

    this.activeRoute.queryParams.subscribe(params => {
      this.category = params['category'];
    })

    if (this.postId) {
      this.post$ = this.postService.getPostById(this.postId);
      this.comments$ = this.commentService.getCommentsOfPost(this.postId);
    } else {
      this.post$ = EMPTY;
    }

    if (this.category) {
      this.category$ = this.categoryService.getCategoryById(BigInt(this.category));
    }
  }

  openCommentDialog(enterAnimationDuration: string, exitAnimationDuration: string) {
    this.dialog.open(CommentDialogComponent, {
      width: '500px',
      height: '500px',
      enterAnimationDuration,
      exitAnimationDuration,
      data: {
        postId: this.postId
      }
    })
  }

  openDialogDelete(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(DeleteDialogComponent, {
        width: '250px',
        enterAnimationDuration,
        exitAnimationDuration,
      data: {
          postId: this.postId
      }
      },
    );
  }

  openDialogEditPost(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(EditPostDialogComponent, {
      width: '500px',
      height: '500px',
      enterAnimationDuration,
      exitAnimationDuration,
      data: {
        postId: this.postId,
        post: this.post$,
        category: this.category$
      }
    })
  }

  openAddImage(enterAnimationDuration: string, exitAnimationDuration: string) {
    this.dialog.open(AddImageDialogComponent, {
      width: '800px',
      enterAnimationDuration,
      exitAnimationDuration,
      data: {
        postId : this.postId
      }
    })
  }
}
