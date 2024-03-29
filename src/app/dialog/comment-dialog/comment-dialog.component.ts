import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {UserService} from "../../services/user.service";
import {Observable} from "rxjs";
import {User} from "../../model/user";
import {CommentService} from "../../services/comment.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-comment-dialog',
  templateUrl: './comment-dialog.component.html',
  styleUrl: './comment-dialog.component.css'
})
export class CommentDialogComponent implements OnInit{
  user$: Observable<User> | undefined;
  username = '';
  guest_name = '';

  // public dialogRef: MatDialogRef<CommentDialogComponent>
  constructor(@Inject(MAT_DIALOG_DATA) public data: {postId : string}, private userService: UserService, private commentService: CommentService) {
  }

  ngOnInit(): void {
    if(localStorage.getItem('username')) {
      this.username += localStorage.getItem('username');
      this.user$ = this.userService.getUserDetail(this.username);
    }
  }

  createComment(value: any) {
    if(this.guest_name !== '') {
      value.email = this.guest_name;
    }
    this.commentService.createComment(this.data.postId, value).subscribe({
      next: () => {
        alert('Comment Successfully!');
        window.location.reload();
      },
      error: err => alert('Failed!')
    })
  }
}
