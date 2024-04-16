import {EventEmitter, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {tap} from "rxjs";
import {User} from "../model/user";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = 'http://localhost:8080/api/user/';

  isAdmin = new EventEmitter<boolean>();
  roles: Set<string> = new Set<string>([]);
  isLogOut = new EventEmitter<boolean>;

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

  logOut() {
    window.localStorage.clear();
    this.isLogOut.emit(true);
    this.isAdmin.emit(false);
    this.roles = new Set<string>([]);
  }
}
