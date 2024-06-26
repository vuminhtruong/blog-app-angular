import { Component, OnInit} from '@angular/core';
import {UserService} from "./services/user.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  loggedIN = false;
  username = '';
  title = 'blog-app-frontend';

  constructor() {
  }

  ngOnInit(): void {
    if (typeof localStorage !== 'undefined') {
      if (localStorage.getItem('username')) {
        this.username += localStorage.getItem('username');
        this.loggedIN = true;
      }
    }
  }
}
