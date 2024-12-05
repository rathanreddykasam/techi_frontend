/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../../services/api-services/api-service.service';

@Component({
  selector: 'uac-view',
  templateUrl: './view.component.html',
  styleUrl: './view.component.scss',
})
export class ViewComponent implements OnInit {
  id!: number;

  post: any;
  constructor(private route: ActivatedRoute, private http: ApiService) {}

  ngOnInit(): void {
    this.id = parseInt(this.route.snapshot.paramMap.get('id'));
    this.getStory();
  }

  getStory() {
    this.http
      .get(`posts/${this.id}`)
      .pipe()
      .subscribe((response) => {
        this.post = response;
        console.log(this.post);
      });
  }
}
