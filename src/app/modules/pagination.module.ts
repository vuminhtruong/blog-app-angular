import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PaginationComponent} from "../components/pagination/pagination.component";
import {PageSizeComponent} from "../components/page-size/page-size.component";



@NgModule({
  declarations: [
    PaginationComponent,
    PageSizeComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    PaginationComponent,
    PageSizeComponent
  ]
})
export class PaginationModule { }
