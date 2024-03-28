import {Component, OnInit} from '@angular/core';
import {CategoryService} from "../../services/category.service";
import {Observable} from "rxjs";
import {Category} from "../../model/category";
import {PostService} from "../../services/post.service";

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrl: './new-post.component.css'
})
export class NewPostComponent implements OnInit{
  category$: Observable<Category[]> | undefined;
  constructor(private categoryService: CategoryService, private postService: PostService) {

  }

  ngOnInit(): void {
    this.category$ = this.categoryService.getAllCategories();
  }

  createPost(value: any) {
    console.log(value);
    this.postService.createNewPost(value).subscribe(value => {
      console.log(value);
    });
  }
}
