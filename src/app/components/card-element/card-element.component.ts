import {Component, Input, OnInit} from '@angular/core';
import {Post} from "../../model/post";
import {Category} from "../../model/category";
import {CategoryService} from "../../services/category.service";
import {Observable} from "rxjs";
import {state} from "@angular/animations";
import {UserService} from "../../services/user.service";
import {User} from "../../model/user";

@Component({
  selector: 'app-card-element',
  templateUrl: './card-element.component.html',
  styleUrl: './card-element.component.css'
})
export class CardElementComponent implements OnInit{
  @Input() post!: Post;
  category$: Observable<Category> | undefined;
  categoryID : BigInt | undefined;

  constructor(private categoryService: CategoryService, private userService: UserService) {

  }

  ngOnInit(): void {
    if(this.post.categoryId) {
      this.categoryID = this.post.categoryId;
      this.category$ = this.categoryService.getCategoryById(this.post.categoryId);
    }
  }
}
