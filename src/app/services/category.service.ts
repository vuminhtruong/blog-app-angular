import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
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
}
