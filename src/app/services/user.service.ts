import {EventEmitter, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, tap} from "rxjs";
import {User} from "../model/user";
import {response} from "express";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  isAdmin = new EventEmitter<boolean>();
  private baseUrl = 'http://localhost:8080/api/user/';
  roles: Set<string> = new Set<string>([]);

  constructor(private http: HttpClient) {
  }

  getUserDetail(username: String) {
    return this.http.get<User>(this.baseUrl + username).pipe(
      tap(
        (response) => {
          response.roles.forEach((value) =>{
            this.roles.add(value.role);
          })
          this.isAdmin.emit(this.roles.has('ROLE_ADMIN'));
        }
      )
    );
  }
}