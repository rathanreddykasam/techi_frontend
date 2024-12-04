import { Injectable } from '@angular/core';
import { ApiService } from '../../services/api-services/api-service.service';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  constructor(private http: ApiService) {}

  getHomePosts() {
    return this.http.get('posts');
  }
}
