import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Comment} from "../model/comment";

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  private baseURL: string = 'http://localhost:8080/api/posts';

  constructor(private http: HttpClient) { }

  getCommentsOfPost(postId: string): Observable<Comment[]> {
    return this.http.get<Comment[]>(this.baseURL + '/' + postId + '/comments');
  }

  createComment(postId: string, value: any) {
    return this.http.post(this.baseURL + '/' + postId + '/comments',value);
  }

}
