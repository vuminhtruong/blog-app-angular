import {
  Component,
  ComponentFactoryResolver,
  ComponentRef,
  OnDestroy,
  OnInit,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import {CategoryService} from "../../services/category.service";
import {Observable, Subscription} from "rxjs";
import {Category} from "../../model/category";
import {PostService} from "../../services/post.service";
import {faAdd} from "@fortawesome/free-solid-svg-icons";
import {NewCategoryComponent} from "../new-category/new-category.component";
import {Router} from "@angular/router";
import Swal from "sweetalert2";

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrl: './new-post.component.css'
})
export class NewPostComponent implements OnInit, OnDestroy{
  @ViewChild('newCategory', {read: ViewContainerRef}) target: ViewContainerRef | undefined;
  private subscription: Subscription = new Subscription();

  canCreate = true;
  iconAdd = faAdd;
  category$: Observable<Category[]> | undefined;


  constructor(private categoryService: CategoryService, private postService: PostService, private route: Router) {

  }

  ngOnInit(): void {
    this.category$ = this.categoryService.getAllCategories();
  }

  createPost(value: any) {
    this.subscription.add(this.postService.createNewPost(value).subscribe({
      next: () => {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Create Post Successfully!",
          showConfirmButton: false,
          timer: 1500
        });
        this.route.navigate(['/']).then();
      },
      error: err => {
        Swal.fire({
        title: 'Error!',
        text: err.error.message,
        icon: 'error',
        confirmButtonText: 'Oke'
      })
      }
    }));
  }

  onNewCategory() {
    if(this.canCreate) {
      this.target?.createComponent(NewCategoryComponent);
      this.canCreate = false;
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
