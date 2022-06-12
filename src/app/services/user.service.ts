import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  BASE_URL = 'http://localhost:8089/api/user';

  constructor(private http: HttpClient) {}

  getAll(): Observable<any> {
    return this.http.get(`${this.BASE_URL}`);
  }
  getById(id: string): Observable<any> {
    return this.http.get(`${this.BASE_URL}/${id}`);
  }
  getByEmail(email: string): Observable<any> {
    return this.http.get(`${this.BASE_URL}/email/?email=${email}`);
  }
}
