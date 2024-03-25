import { Component } from '@angular/core';
import { faAdd } from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent {
  iconAdd = faAdd;
}
