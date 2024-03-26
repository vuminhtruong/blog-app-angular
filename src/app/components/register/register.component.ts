import {Component, OnInit} from '@angular/core';
import {FormGroup, NgForm} from "@angular/forms";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {

  constructor() {
  }

  ngOnInit(): void {
  }

  onSubmit(form : NgForm) {
    console.log(form.value);
  }
}
