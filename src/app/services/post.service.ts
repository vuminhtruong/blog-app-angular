import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Post} from "../model/post";

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private baseURL: String = 'http://localhost:3000';
  constructor(private http: HttpClient) {}

  getAllPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(this.baseURL + '/posts');
  }

  getPostById(id: String): Observable<Post> {
    return this.http.get<Post>(this.baseURL + '/posts/' + id);
  }
}
