import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  BASE_URL = 'http://localhost:8089/api/auth';

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<any> {
    let user = {
      email,
      password,
    };
    return this.http.post(`${this.BASE_URL}/login`, user);
  }
}
