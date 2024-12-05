/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable } from '@angular/core';
import { ApiService } from '../api-services/api-service.service';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private tokenKey = 'authToken'; // Key for storing token in localStorage
  private userKey = 'authUser';
  public redirectUrl: string | null = null;

  private mySubject = new BehaviorSubject<string>('Initial Value');
  myValue$ = this.mySubject.asObservable();

  constructor(private http: ApiService, private router: Router) {}

  login(credentials: { username: string; password: string }) {
    return this.http.post('api/login', credentials);
  }

  signup(credentials: {
    username: string;
    password: string;
    mobile: string;
    email: string;
  }) {
    return this.http.post('api/signup', credentials);
  }

  saveAuthDetails(response: {
    authToken: string;
    id: string;
    name: string;
    email: string;
  }) {
    this.updateValue(response);
    localStorage.setItem(this.tokenKey, response.authToken);
    localStorage.setItem(
      this.userKey,
      JSON.stringify({
        id: response.id,
        name: response.name,
        email: response.email,
      })
    );
  }

  updateValue(newValue?: any) {
    this.mySubject.next(newValue);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  getUserDetails(): { id: string; name: string; email: string } | null {
    const user = localStorage.getItem(this.userKey);
    return user ? JSON.parse(user) : null;
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  logout() {
    this.http.post('api/logout');
    this.updateValue();
    this.router.navigate(['/home']);
    localStorage.clear();
  }
}
