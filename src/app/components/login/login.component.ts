import {Component, OnDestroy} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import {Subscription} from "rxjs";
import Swal from "sweetalert2";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnDestroy{
  private subscription: Subscription = new Subscription();

  constructor(private authService: AuthService, private router: Router) {
  }

  onLogin(value: any) {
    this.subscription.add(this.authService.login(value).subscribe({
      next: () => {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Your work has been saved",
          showConfirmButton: false,
          timer: 1500
        });
        this.router.navigate(['/']).then();
      },
      error: err => Swal.fire({
        title: 'Error!',
        text: 'User or Password not correct',
        icon: 'error',
        confirmButtonText: 'Oke'
      })
    }));
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
