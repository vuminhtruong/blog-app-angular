import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {Observable, Subscription, tap} from "rxjs";
import {Post} from "../../model/post";
import {faAdd} from "@fortawesome/free-solid-svg-icons";
import {Category} from "../../model/category";
import {CategoryService} from "../../services/category.service";
import {PostService} from "../../services/post.service";
import {Router} from "@angular/router";
import Swal from "sweetalert2";

@Component({
  selector: 'app-edit-post-dialog',
  templateUrl: './edit-post-dialog.component.html',
  styleUrl: './edit-post-dialog.component.css'
})
export class EditPostDialogComponent implements OnInit, OnDestroy {
  post$: Observable<Post> | undefined;
  categoryPost$: Observable<Category> | undefined;
  categoryAll$: Observable<Category[]> | undefined;

  selectedCategory: any;
  private subscription: Subscription = new Subscription();

  constructor(@Inject(MAT_DIALOG_DATA) public data: {
    postId: string,
    post: Observable<Post>,
    category: Observable<Category>
  }, private categoryService: CategoryService, private postService: PostService, private router: Router) {
  }

  ngOnInit() {
    this.post$ = this.data.post;
    this.categoryPost$ = this.data.category;
    this.categoryAll$ = this.categoryService.getAllCategories();
  }

  editPost(value: any) {
    if (this.selectedCategory) {
      const categoryId = {categoryId: this.selectedCategory.id};
      value = {...value, ...categoryId}
    }

    this.postService.editPost(this.data.postId, value).subscribe({
      next: () => {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Edit Successfully!",
          showConfirmButton: false,
          timer: 1500
        });
        this.router.navigate(['/']).then();
      },
      error: err => {
        Swal.fire({
          title: 'Error!',
          text: err.error.message,
          icon: 'error',
          confirmButtonText: 'Oke'
        })
      }
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
