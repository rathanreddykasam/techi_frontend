/* eslint-disable @typescript-eslint/no-empty-function */
import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { HomeService } from '../../services/home.service';
import { Router } from '@angular/router';
import { catchError, exhaustMap, map, of } from 'rxjs';
import {
  homeActionTypes,
  loadHomePostsFailure,
  loadHomePostsSuccess,
} from '../actions/home.actions';

@Injectable()
export class HomeEffects {
  private homeService = inject(HomeService);
  actions$ = inject(Actions);
  router = inject(Router);

  loadHomePosts$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(homeActionTypes.LOAD_HOME_POSTS),
        exhaustMap(() =>
          this.homeService.getHomePosts().pipe(
            map((result) => loadHomePostsSuccess({ tableData: result })),
            catchError((error) => of(loadHomePostsFailure({ error })))
          )
        )
        // Errors are handled and it is safe to disable resubscription
      ),
    { useEffectsErrorHandler: false }
  );

  constructor() {}
}
