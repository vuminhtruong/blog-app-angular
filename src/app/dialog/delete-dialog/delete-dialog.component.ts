import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {PostService} from "../../services/post.service";
import {faTrash} from "@fortawesome/free-solid-svg-icons";
import {Router} from "@angular/router";
import {Subscription} from "rxjs";
import Swal from "sweetalert2";

@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrl: './delete-dialog.component.css'
})
export class DeleteDialogComponent implements OnInit {
  iconDelete = faTrash;
  postId: string = '';

  private subscription: Subscription = new Subscription();

  constructor(@Inject(MAT_DIALOG_DATA) public data: {
    postId: string
  }, private postService: PostService, private route: Router) {
  }

  ngOnInit(): void {
    this.postId = this.data.postId;
  }


  onDelete(postId: string) {
    const id = BigInt(postId);
    this.postService.deletePost(id).subscribe({
      next: () => {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Delete Successfully!",
          showConfirmButton: false,
          timer: 1500
        });
        this.route.navigate(['/']).then();
      },
      error: err => {
        Swal.fire({
          title: 'Error!',
          text: 'You do not have access',
          icon: 'error',
          confirmButtonText: 'Oke'
        })
      }
    });
  }
}

