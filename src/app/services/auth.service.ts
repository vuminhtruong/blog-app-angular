import {EventEmitter, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Router} from "@angular/router";
import {BehaviorSubject, tap} from "rxjs";

interface loginResponse {
  accessToken : string,
  tokenType: string
}


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseURL: string = 'http://localhost:8080/api/auth/';
  // private loggedIn = new BehaviorSubject<boolean>(false);
  loggedIn = new EventEmitter<boolean>();

  constructor(private http: HttpClient) {

  }

  // setLoggedIn(value: boolean) {
  //   this.loggedIn.next(value);
  // }

  // get isLoggedIn() {
  //   return this.loggedIn.asObservable();
  // }

  register(register: any) {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json');

    return this.http.post(this.baseURL + 'register', register, {headers: headers, responseType: 'text'});
  }

  login(login: any) {
    return this.http.post<loginResponse>(this.baseURL + 'login', login).pipe(
      tap((response) => {
        localStorage.setItem('username', login.username);
        localStorage.setItem('jwt_token', response.accessToken);
        localStorage.setItem('token_type', response.tokenType);
        this.loggedIn.emit(true);
        // this.setLoggedIn(true);
      })
    )
  }

}
