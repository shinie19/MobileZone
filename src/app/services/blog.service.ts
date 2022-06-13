import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BlogService {
  BASE_URL = 'http://localhost:8089/api/blog';

  constructor(private http: HttpClient) {}

  getAll(): Observable<any> {
    return this.http.get(this.BASE_URL);
  }
  getById(id: string): Observable<any> {
    return this.http.get(`${this.BASE_URL}/${id}`);
  }
  add(blog: any): Observable<any> {
    return this.http.post(this.BASE_URL, blog);
  }
  update(id: string, blog: any): Observable<any> {
    return this.http.put(`${this.BASE_URL}/${id}`, blog);
  }
  remove(id: string): Observable<any> {
    return this.http.get(`${this.BASE_URL}/delete/${id}`);
  }
}
