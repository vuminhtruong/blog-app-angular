import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Router} from "@angular/router";
import {tap} from "rxjs";

interface loginResponse {
  accessToken : string,
  tokenType: string
}


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseURL: string = 'http://localhost:8080/api/auth/';
  loggedIn: boolean = false;

  constructor(private http: HttpClient, private router: Router) {

  }

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
        this.loggedIn = true;
      })
    )
  }

}
