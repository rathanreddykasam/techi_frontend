/* eslint-disable @typescript-eslint/no-explicit-any */
import { isDevMode } from '@angular/core';
import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  MetaReducer,
} from '@ngrx/store';
import {
  userDataReducer,
  userDataState,
  usersDataState,
  usersReducer,
} from './reducers/users/users.reducer';
import {
  userRolesReducer,
  userRolesState,
} from './reducers/userRoles/user-roles.reducer';
import { usersActionTypes } from './actions/users.actions';

export const usersFeatureKey = 'users';

export interface UsersState {
  usersData: usersDataState;
  userData: userDataState;
  userRoles: userRolesState;
}

export const reducers: ActionReducerMap<UsersState> = {
  usersData: usersReducer,
  userData: userDataReducer,
  userRoles: userRolesReducer,
};

export function clearState(reducer: ActionReducer<UsersState>): any {
  return (state: UsersState, action: any): any => {
    if (action.type === usersActionTypes.CLEAR_USERS_STATE) {
      state = undefined;
    }
    return reducer(state, action);
  };
}

export const metaReducers: MetaReducer<UsersState>[] = isDevMode()
  ? [clearState, logger]
  : [clearState];
export function logger(reducer: ActionReducer<UsersState>): any {
  return (state: UsersState, action: any): any => {
    const result = reducer(state, action);
    console.groupCollapsed(action.type);
    console.log('prev state', state);
    console.log('action', action);
    console.log('next state', result);
    console.groupEnd();

    return result;
  };
}

export const selectUsersFeature =
  createFeatureSelector<UsersState>(usersFeatureKey);
