import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {CategoryService} from "../../services/category.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-new-category',
  templateUrl: './new-category.component.html',
  styleUrl: './new-category.component.css'
})
export class NewCategoryComponent {
  constructor(private categoryService: CategoryService) {

  }


  createNewCategory(value: any) {
    this.categoryService.createCategory(value).subscribe({
      next: () => {
        alert('Successfully!');
        window.location.reload();
      },
    });
  }
}
