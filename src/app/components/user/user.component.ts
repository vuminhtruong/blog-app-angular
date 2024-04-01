import {Component, EventEmitter, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {User} from "../../model/user";
import {UserService} from "../../services/user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent implements OnInit {
  user$: Observable<User> | undefined;
  username: string = '';
  isAdmin: boolean = false;

  constructor(private userService: UserService, private router: Router) {

  }

  ngOnInit(): void {
    if(localStorage.getItem('username')) {
      this.username += localStorage.getItem('username');
      this.user$ = this.userService.getUserDetail(this.username);
      // console.log(this.isAdmin); // false
      this.userService.isAdmin.subscribe((value) => {
        this.isAdmin = value;
      })
      // console.log(this.isAdmin); // false
    }
  }

  logOut() {
    this.userService.logOut();
    this.router.navigate(['/']).then(data => console.log(data));
  }
}
