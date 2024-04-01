import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {PostService} from "../../services/post.service";
import {faTrash} from "@fortawesome/free-solid-svg-icons";
import {Router} from "@angular/router";

@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrl: './delete-dialog.component.css'
})
export class DeleteDialogComponent implements OnInit{
  iconDelete = faTrash;
  postId: string = '';

  constructor(@Inject(MAT_DIALOG_DATA) public data: { postId: string }, private postService: PostService, private route: Router) {
  }

  ngOnInit(): void {
    this.postId = this.data.postId;
    console.log(this.postId);
  }


  onDelete(postId: string) {
    const id = BigInt(postId);
    this.postService.deletePost(id).subscribe({
      next: () => {
        alert('Delete Successfully!');
        this.route.navigate(['/']).then(r => console.log(r));
      },
      error: err => alert('You are not ADMIN')
    })
  }
}

