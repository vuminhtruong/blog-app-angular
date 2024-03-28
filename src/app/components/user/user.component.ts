import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {User} from "../../model/user";
import {HttpClient} from "@angular/common/http";
import {UserService} from "../../services/user.service";
import {Role} from "../../model/role";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent implements OnInit {
  user$: Observable<User> | undefined;
  username: string = '';
  isAdmin: boolean = false;

  constructor(private userService: UserService) {

  }

  ngOnInit(): void {
    if(localStorage.getItem('username')) {
      this.username += localStorage.getItem('username');
      this.user$ = this.userService.getUserDetail(this.username);
      this.userService.isAdmin.subscribe((value) => {
        this.isAdmin = value;
      })
    }
  }
}
