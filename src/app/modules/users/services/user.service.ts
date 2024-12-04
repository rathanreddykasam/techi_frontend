/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable } from '@angular/core';
import { ApiService } from '../../../services/api-services/api-service.service';

@Injectable()
export class UserService {
  constructor(private http: ApiService) {}

  getUsersData(action) {
    return this.http.post('SearchUsers', { ...action });
  }

  getUserData(id: number) {
    return this.http.get(`GetUser/${id}`);
  }

  getUserRoles() {
    return this.http.get('Roles');
  }

  saveUser(user) {
    if (user?.Id) {
      return this.http.put('UpdateUser', user);
    }
    return this.http.post('AddUser', user);
  }

  deleteUser(user: any) {
    return this.http.delete('DeleteUser', user);
  }
}
