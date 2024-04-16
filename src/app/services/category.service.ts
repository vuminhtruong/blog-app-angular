import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Category} from "../model/category";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private baseUrl: string = 'http://localhost:8080/api/categories';

  constructor(private http: HttpClient) {
  }

  getAllCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.baseUrl);
  }

  getCategoryById(categoryId: BigInt): Observable<Category> {
    return this.http.get<Category>(this.baseUrl + '/' + categoryId);
  }

  createCategory(newCategory: any) {
    // const jwt_token = localStorage.getItem('jwt_token');
    // const headers_object = new HttpHeaders({
    //   'Content-Type': 'application/json',
    //   'Authorization': "Bearer " + jwt_token
    // });
    //
    // const httpOptions = {
    //   headers: headers_object
    // };

    return this.http.post(this.baseUrl, newCategory);
  }
}
