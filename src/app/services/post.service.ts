import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Post} from "../model/post";

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private baseURL: string = 'http://localhost:8080/api/posts';
  constructor(private http: HttpClient) {}

  getAllPostsWithOutPageSize(): Observable<Post[]> {
    return this.http.get<Post[]>(this.baseURL + '/all-post');
  }

  getAllPostsWithDefaultPageSize() {
    return this.http.get<Post[]>(this.baseURL);
  }

  getPostsWithPageSize(pageSize: string, pageNo: string, sortBy: string) {
    return this.http.get<Post[]>(this.baseURL + '?pageSize=' + pageSize + '&pageNo=' + pageNo + '&sortBy=' + sortBy);
  }


  getPostById(id: String): Observable<Post> {
    return this.http.get<Post>(this.baseURL + '/'+ id);
  }

}
