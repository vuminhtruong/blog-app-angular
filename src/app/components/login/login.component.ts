import { Component } from '@angular/core';
import {NgForm} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  constructor(private authService: AuthService, private router: Router) {
  }

  onLogin(value: any) {
    this.authService.login(value).subscribe({
      next: () => {
        alert('Login Successfully!');
        this.router.navigate(['/']).then();
      },
      error: err => alert('Username or Password is not correct')
    });
  }
}
