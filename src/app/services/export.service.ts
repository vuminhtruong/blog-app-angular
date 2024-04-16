import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ExportService {
  private baseURL: string = 'http://localhost:8080/api/report/export';
  constructor(private httpClient: HttpClient) { }

  getFileReport() {
    this.httpClient.get(this.baseURL, { responseType: 'blob' })
      .subscribe((response: Blob) => {
        const blob = new Blob([response], { type: 'application/pdf' });
        const url = window.URL.createObjectURL(blob);
        window.open(url);
      }, error => {
        console.error('Error downloading PDF: ', error);
      });
  }
}
