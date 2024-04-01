import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Post} from "../model/post";
import {response} from "express";

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private baseURL: string = 'http://localhost:8080/api/posts';

  constructor(private http: HttpClient) {
  }

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
    return this.http.get<Post>(this.baseURL + '/' + id);
  }

  createNewPost(newPost: any) {
    const jwt_token = localStorage.getItem('jwt_token');
    const headers_object = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': "Bearer " + jwt_token
    });

    const httpOptions = {
      headers: headers_object
    };

    return this.http.post(this.baseURL, newPost, httpOptions);
  }

  getAllPostsByCategory(category_id: string): Observable<Post[]> {
    return this.http.get<Post[]>(this.baseURL + '/category/' + category_id);
  }

  getPostsByCategory(category_id: string, pageSize: string, pageNo: string, sortBy: string) {
    return this.http.get<Post[]>(this.baseURL + '/category/' + category_id + '/filter'  + '?pageSize=' + pageSize + '&pageNo=' + pageNo + '&sortBy=' + sortBy)
  }


}
