import {AfterViewInit, Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {faAdd} from "@fortawesome/free-solid-svg-icons";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent implements OnInit {
  iconAdd = faAdd;

  @Input()
  loggedIn: boolean = false;

  isAdmin: boolean | undefined;

  constructor(private authService: AuthService, private router: Router, private userService: UserService) {

  }

  ngOnInit(): void {
    this.authService.loggedIn.subscribe((value) => {
      this.loggedIn = value;
    });
    this.userService.isAdmin.subscribe((value) => {
      this.isAdmin = value;
    })
    this.userService.isLogOut.subscribe(value => {
      this.loggedIn = !value;
      console.log(this.loggedIn);
    })
  }

  onClickNewPost() {
    if (this.isAdmin) {
      this.router.navigate(['/new-post']).then(value => console.log(value));
    } else {
      alert('Fail!');
    }
  }
}
