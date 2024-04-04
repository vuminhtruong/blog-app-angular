import {EventEmitter, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {BehaviorSubject, map, Observable} from "rxjs";
import {Post} from "../model/post";
import {response} from "express";

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private baseURL: string = 'http://localhost:8080/api/posts';
  private inputSearch = new BehaviorSubject('');
  private allPost = new BehaviorSubject<Post[]>([]);

  constructor(private http: HttpClient) {

  }

  fetchAllPost() : Observable<Post[]> {
    return this.allPost.asObservable();
  }

  pushAllPost(posts: Post[]) {
    this.allPost.next(posts);
  }

  fetchInputSearch() : Observable<string> {
    return this.inputSearch.asObservable();
  }

  pushInputSearch(inputSearch: string) {
    this.inputSearch.next(inputSearch);
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

  deletePost(id : BigInt) {
    const jwt_token = localStorage.getItem('jwt_token');
    const headers_object = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': "Bearer " + jwt_token
    });

    return this.http.delete(this.baseURL + '/' + id, {headers: headers_object, responseType: 'text'});
  }

  getAllPostsByCategory(category_id: string): Observable<Post[]> {
    return this.http.get<Post[]>(this.baseURL + '/category/' + category_id);
  }

  getPostsByCategory(category_id: string, pageSize: string, pageNo: string, sortBy: string) {
    return this.http.get<Post[]>(this.baseURL + '/category/' + category_id + '/filter'  + '?pageSize=' + pageSize + '&pageNo=' + pageNo + '&sortBy=' + sortBy)
  }


  editPost(postId: string, value: any) {
    const jwt_token = localStorage.getItem('jwt_token');
    const headers_object = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': "Bearer " + jwt_token
    });

    const httpOptions = {
      headers: headers_object
    };

    return this.http.put(this.baseURL + '/' + postId, value, httpOptions);
  }
}
