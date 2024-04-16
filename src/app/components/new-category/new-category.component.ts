import {Component, OnDestroy} from '@angular/core';
import {CategoryService} from "../../services/category.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-new-category',
  templateUrl: './new-category.component.html',
  styleUrl: './new-category.component.css'
})
export class NewCategoryComponent implements OnDestroy {
  private subscription: Subscription = new Subscription();

  constructor(private categoryService: CategoryService) {

  }

  createNewCategory(value: any) {
    this.subscription.add(this.categoryService.createCategory(value).subscribe({
      next: () => {
        alert('Successfully!');
        window.location.reload();
      },
    }));
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
