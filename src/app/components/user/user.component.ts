import {Component, EventEmitter, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subscription} from "rxjs";
import {User} from "../../model/user";
import {UserService} from "../../services/user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent implements OnInit, OnDestroy {
  user$: Observable<User> | undefined;
  username: string = '';
  isAdmin: boolean = false;
  private subscription: Subscription = new Subscription();

  constructor(private userService: UserService, private router: Router) {

  }

  ngOnInit(): void {
    if(localStorage.getItem('username')) {
      this.username += localStorage.getItem('username');
      this.user$ = this.userService.getUserDetail(this.username);
      this.subscription.add(this.userService.isAdmin.subscribe((value) => {
        this.isAdmin = value;
      }));
    }
  }

  logOut() {
    this.userService.logOut();
    this.router.navigate(['/']).then();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
