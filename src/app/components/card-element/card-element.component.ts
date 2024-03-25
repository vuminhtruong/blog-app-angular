import {Component, Input, OnInit} from '@angular/core';
import {Post} from "../../model/post";

@Component({
  selector: 'app-card-element',
  templateUrl: './card-element.component.html',
  styleUrl: './card-element.component.css'
})
export class CardElementComponent{
  @Input() post!: Post;
}
