import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  BASE_URL = 'http://localhost:8089/api/order';

  constructor(private http: HttpClient) {}

  getAll(): Observable<any> {
    return this.http.get(this.BASE_URL);
  }
  getById(id: string): Observable<any> {
    return this.http.get(`${this.BASE_URL}/${id}`);
  }
  add(order: any): Observable<any> {
    return this.http.post(this.BASE_URL, order);
  }
  update(id: string, order: any): Observable<any> {
    return this.http.put(`${this.BASE_URL}/${id}`, order);
  }
  remove(id: string): Observable<any> {
    return this.http.get(`${this.BASE_URL}/delete/${id}`);
  }
}
