/* eslint-disable @typescript-eslint/no-empty-function */
import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { UserService } from '../../services/user.service';
import {
  deleteUserFailure,
  deleteUserSuccess,
  getUserFailure,
  getUserSuccess,
  loadUserRolesFailure,
  loadUserRolesSuccess,
  loadUsersFailure,
  loadUsersSuccess,
  saveUserFailure,
  saveUserSuccess,
  usersActionTypes,
} from '../actions/users.actions';
import { catchError, exhaustMap, map, of, tap } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class UsersEffects {
  private userService = inject(UserService);
  actions$ = inject(Actions);
  router = inject(Router);

  loadUsers$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(usersActionTypes.LOAD_USERS_DATA),
        exhaustMap((action) =>
          this.userService.getUsersData(action.params).pipe(
            map((result) => loadUsersSuccess({ tableData: result })),
            catchError((error) => of(loadUsersFailure({ error })))
          )
        )
        // Errors are handled and it is safe to disable resubscription
      ),
    { useEffectsErrorHandler: false }
  );

  loadUserData$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(usersActionTypes.GET_USER_DATA),
        exhaustMap((action) =>
          this.userService.getUserData(action.id).pipe(
            map((result) => getUserSuccess({ data: result })),
            catchError((error) => of(getUserFailure({ error })))
          )
        )
        // Errors are handled and it is safe to disable resubscription
      ),
    { useEffectsErrorHandler: true }
  );

  loadUserRoles$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(usersActionTypes.LOAD_USER_ROLES),
        exhaustMap(() =>
          this.userService.getUserRoles().pipe(
            map((result) => loadUserRolesSuccess({ userRoles: result })),
            catchError((error) => of(loadUserRolesFailure({ error })))
          )
        )
        // Errors are handled and it is safe to disable resubscription
      ),
    { useEffectsErrorHandler: true }
  );

  saveUser$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(usersActionTypes.SAVE_USER_DATA),
        exhaustMap((action) =>
          this.userService.saveUser(action.userData).pipe(
            tap(() => this.router.navigate(['/users'])),
            map(() => saveUserSuccess()),
            catchError((error) => of(saveUserFailure({ error })))
          )
        )
        // Errors are handled and it is safe to disable resubscription
      ),
    { useEffectsErrorHandler: true }
  );

  deleteUser$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(usersActionTypes.DELETE_USER_DATA),
        exhaustMap((action) =>
          this.userService.deleteUser(action.data).pipe(
            map(() => deleteUserSuccess({ id: action.data.Id })),
            catchError((error) => of(deleteUserFailure(error)))
          )
        )
        // Errors are handled and it is safe to disable resubscription
      ),
    { useEffectsErrorHandler: true }
  );

  constructor() {}
}
