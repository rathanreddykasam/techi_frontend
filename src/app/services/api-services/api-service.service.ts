/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  get(endpoint: string) {
    return this.http.get(`${environment.apiUrl}/${endpoint}`);
  }

  post(endpoint: string, data?: any) {
    return this.http.post(`${environment.apiUrl}/${endpoint}`, data);
  }

  put(endpoint: string, data: any) {
    return this.http.put(`${environment.apiUrl}/${endpoint}`, data);
  }

  delete(endpoint: string, data: any) {
    return this.http.delete(`${environment.apiUrl}/${endpoint}`, {
      body: data,
    });
  }
}
