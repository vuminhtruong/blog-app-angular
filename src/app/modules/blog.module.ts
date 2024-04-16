import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {BlogCardComponent} from "../components/blog-card/blog-card.component";
import {CardElementComponent} from "../components/card-element/card-element.component";
import {PostDetailComponent} from "../components/post-detail/post-detail.component";
import {CommentComponent} from "../components/comment/comment.component";
import {AppMaterialModule} from "../material/app-material.module";
import {PaginationModule} from "./pagination.module";
import {AppRoutingModule} from "../app-routing.module";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";



@NgModule({
  declarations: [
    BlogCardComponent,
    CardElementComponent,
    PostDetailComponent,
    CommentComponent
  ],
  imports: [
    CommonModule,
    AppMaterialModule,
    PaginationModule,
    AppRoutingModule,
    FontAwesomeModule
  ]
})
export class BlogModule { }
