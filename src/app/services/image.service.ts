import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Image} from "../model/image";

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  private baseURL: string = 'http://localhost:8080/api/images';

  constructor(private http: HttpClient) {

  }

  uploadImage(event: any) {
    const jwt_token = localStorage.getItem('jwt_token');
    const headers_object = new HttpHeaders({
      // 'Content-Type': 'multipart/form-data',
      'Authorization': "Bearer " + jwt_token
    });

    const httpOptions = {
      headers: headers_object
    };

    const files = event.target.files;
    const formData = new FormData();

    for(let i=0; i < files.length; i++) {
      formData.append('files', files[i]);
    }

    return this.http.post<Image>(this.baseURL, formData, httpOptions);
  }
}