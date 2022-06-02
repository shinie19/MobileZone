import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SliderService {
  BASE_URL = 'http://localhost:8089/api/slider';

  constructor(private http: HttpClient) {}

  getAll(): Observable<any> {
    return this.http.get(`${this.BASE_URL}`);
  }
}
