import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  BASE_URL = 'http://localhost:8089/api/product';

  constructor(private http: HttpClient) {}

  getAll(): Observable<any> {
    return this.http.get(`${this.BASE_URL}`);
  }
  getById(id: string): Observable<any> {
    return this.http.get(`${this.BASE_URL}/${id}`);
  }
  getByBrandId(id: string): Observable<any> {
    return this.http.get(`${this.BASE_URL}/brand/${id}`);
  }
  getNewArrival(): Observable<any> {
    return this.http.get(`${this.BASE_URL}/new-arrivals`);
  }
  getFeaturedProducts(): Observable<any> {
    return this.http.get(`${this.BASE_URL}/featured-products`);
  }
  getBestSellerProducts(): Observable<any> {
    return this.http.get(`${this.BASE_URL}/best-seller-products`);
  }
  add(product: any): Observable<any> {
    return this.http.post(this.BASE_URL, product);
  }
  update(id: string, product: any): Observable<any> {
    return this.http.put(`${this.BASE_URL}/${id}`, product);
  }
  remove(id: string): Observable<any> {
    return this.http.get(`${this.BASE_URL}/delete/${id}`);
  }
}
