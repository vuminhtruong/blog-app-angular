import {Component, OnDestroy, OnInit} from '@angular/core';
import {RegisterService} from "../../services/register.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit{

  constructor(private registerService: RegisterService, private router: Router) {
  }

  ngOnInit(): void {
  }

  onSubmit(value: any) {
    this.registerService.register(value).subscribe(value => {
        if(value === 'User registered successfully') {
          alert('Register Successfully!');
          // data = true
          this.router.navigate(['/']).then(data => console.log(data));
        }
      },
      error => {
        alert('Username or Email already exists!');
      }
    );
  }
}
