import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ColorService {
  BASE_URL = 'http://localhost:8089/api/color';

  constructor(private http: HttpClient) {}

  getAll(): Observable<any> {
    return this.http.get(`${this.BASE_URL}`);
  }
  getById(id: string): Observable<any> {
    return this.http.get(`${this.BASE_URL}/${id}`);
  }
  add(color: any): Observable<any> {
    return this.http.post(this.BASE_URL, color);
  }
  remove(id: string): Observable<any> {
    return this.http.get(`${this.BASE_URL}/delete/${id}`);
  }
}
