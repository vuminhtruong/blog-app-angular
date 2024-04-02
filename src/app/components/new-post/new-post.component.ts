import {Component, ComponentFactoryResolver, ComponentRef, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {CategoryService} from "../../services/category.service";
import {Observable} from "rxjs";
import {Category} from "../../model/category";
import {PostService} from "../../services/post.service";
import {faAdd} from "@fortawesome/free-solid-svg-icons";
import {NewCategoryComponent} from "../new-category/new-category.component";
import {Router} from "@angular/router";

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrl: './new-post.component.css'
})
export class NewPostComponent implements OnInit{
  @ViewChild('newCategory', {read: ViewContainerRef}) target: ViewContainerRef | undefined;

  canCreate = true;
  iconAdd = faAdd;
  category$: Observable<Category[]> | undefined;


  constructor(private categoryService: CategoryService, private postService: PostService, private route: Router) {

  }

  ngOnInit(): void {
    this.category$ = this.categoryService.getAllCategories();
  }

  createPost(value: any) {
    this.postService.createNewPost(value).subscribe({
      next: () => {
        alert('Create Post Successfully!');
        this.route.navigate(['/']).then();
      },
      error: err => alert('Category not set!')
    });
  }

  onNewCategory() {
    if(this.canCreate) {
      this.target?.createComponent(NewCategoryComponent);
      this.canCreate = false;
    }
  }
}
