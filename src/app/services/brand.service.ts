import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BrandService {
  BASE_URL = 'http://localhost:8089/api/brand';

  constructor(private http: HttpClient) {}

  getAll(): Observable<any> {
    return this.http.get(`${this.BASE_URL}`);
  }
  getById(id: string): Observable<any> {
    return this.http.get(`${this.BASE_URL}/${id}`);
  }
  add(brand: any): Observable<any> {
    return this.http.post(this.BASE_URL, brand);
  }
  update(id: string, brand: any): Observable<any> {
    return this.http.put(`${this.BASE_URL}/${id}`, brand);
  }
  remove(id: string): Observable<any> {
    return this.http.get(`${this.BASE_URL}/delete/${id}`);
  }
}
