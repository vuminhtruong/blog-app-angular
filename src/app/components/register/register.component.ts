import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit, OnDestroy{
  private subscription: Subscription = new Subscription();

  constructor(private authService: AuthService, private router: Router) {
  }

  ngOnInit(): void {
  }

  onSubmit(value: any) {
    this.subscription.add(this.authService.register(value).subscribe(value => {
        if(value === 'User registered successfully') {
          alert('Register Successfully!');
          // data = true
          this.router.navigate(['/']).then(data => console.log(data));
        }
      },
      error => {
        alert('Username or Email already exists!');
      }
    ));
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
