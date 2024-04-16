import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AddImageDialogComponent} from "../dialog/add-image-dialog/add-image-dialog.component";
import {CommentDialogComponent} from "../dialog/comment-dialog/comment-dialog.component";
import {DeleteDialogComponent} from "../dialog/delete-dialog/delete-dialog.component";
import {EditPostDialogComponent} from "../dialog/edit-post-dialog/edit-post-dialog.component";
import {AppMaterialModule} from "../material/app-material.module";
import {FormsModule} from "@angular/forms";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";

@NgModule({
  declarations: [
    AddImageDialogComponent,
    CommentDialogComponent,
    DeleteDialogComponent,
    EditPostDialogComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    AppMaterialModule,
    FontAwesomeModule
  ]
})
export class DialogModuleModule { }
