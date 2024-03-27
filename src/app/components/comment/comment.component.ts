import { Component, Input } from '@angular/core';
import {Comment} from "../../model/comment";

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.css'
})
export class CommentComponent {
  @Input()
  comment!: Comment;
}
