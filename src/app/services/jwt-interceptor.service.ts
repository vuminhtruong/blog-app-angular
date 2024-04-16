import { Injectable } from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class JwtInterceptorService implements HttpInterceptor{
  constructor() { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (typeof localStorage !== 'undefined') {
      const jwtToken = localStorage.getItem('jwt_token');
      if (jwtToken != null) {
        request = request.clone({
          setHeaders: {
            Authorization: `Bearer ${jwtToken}`,
          },
        });
      }
    }
    return next.handle(request);
  }
}
