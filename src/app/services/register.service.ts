import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {NgForm} from "@angular/forms";
import {catchError, Observable} from "rxjs";
import {Register} from "../model/register";

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  private baseURL: string = 'http://localhost:8080/api/auth/register';

  constructor(private http: HttpClient) {

  }

  register(register: any){
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json');

    return this.http.post(this.baseURL,register,{headers : headers, responseType: 'text'});
  }

}
