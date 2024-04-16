import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {UserService} from "../../services/user.service";
import {Observable, Subscription} from "rxjs";
import {User} from "../../model/user";
import {CommentService} from "../../services/comment.service";
import {ActivatedRoute} from "@angular/router";
import Swal from "sweetalert2";

@Component({
  selector: 'app-comment-dialog',
  templateUrl: './comment-dialog.component.html',
  styleUrl: './comment-dialog.component.css'
})
export class CommentDialogComponent implements OnInit, OnDestroy{
  user$: Observable<User> | undefined;
  username = '';
  guest_name = '';

  private subscription: Subscription = new Subscription();

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
    this.subscription.add(this.commentService.createComment(this.data.postId, value).subscribe({
      next: () => {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Successfully!",
          showConfirmButton: false,
          timer: 1500
        });
        window.location.reload();
      },
      error: err => alert('Failed!')
    }));
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
