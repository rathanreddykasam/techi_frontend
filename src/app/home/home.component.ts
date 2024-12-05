/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromHome from './store';
import { loadHomePosts } from './store/actions/home.actions';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { userPosts } from './store/selectors/home.selectors';
import { Observable, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'uac-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit, OnDestroy {
  userPosts$: Observable<any>;
  destroyed$: Subject<any> = new Subject<any>();
  readonly dialog = inject(MatDialog);

  title = 'WELCOME';
  homePageDisclaimer = ``;

  miniposts: any;
  majorPosts: any;

  constructor(private store: Store<fromHome.HomeState>, public router: Router) {
    //this.openDialog();
    this.userPosts$ = store.select(userPosts);
    this.store.dispatch(loadHomePosts());
  }

  ngOnInit(): void {
    this.userPosts$.pipe(takeUntil(this.destroyed$)).subscribe((data) => {
      if (data?.usersPosts?.length > 1) {
        const halfLength = Math.ceil(data.usersPosts.length / 2);
        this.miniposts = data.usersPosts.slice(0, halfLength);
        console.log(this.miniposts);
        this.majorPosts = data.usersPosts.slice(halfLength);
      }
    });
  }

  viewPost(id) {
    this.router.navigate([`/user-posts/${id}`]);
  }

  ngOnDestroy(): void {
    this.destroyed$.closed;
  }
}
