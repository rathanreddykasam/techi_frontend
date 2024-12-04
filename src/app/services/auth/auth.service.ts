/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable } from '@angular/core';
import { ApiService } from '../api-services/api-service.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private tokenKey = 'authToken'; // Key for storing token in localStorage
  private userKey = 'authUser';

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
    localStorage.clear();
    this.router.navigate(['/home']);
    window.location.reload();
  }
}
