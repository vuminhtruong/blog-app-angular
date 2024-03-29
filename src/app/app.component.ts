import {Component, OnInit} from '@angular/core';
import {AuthService} from "./services/auth.service";
import {UserService} from "./services/user.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  loggedIN = false
  title = 'blog-app-frontend';

  ngOnInit(): void {
    if(typeof window !==  'undefined') {
      if(localStorage.getItem('username')) {
        this.loggedIN = true;
      }
    }
  }
}
