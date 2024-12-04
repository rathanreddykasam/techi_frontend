/* eslint-disable @typescript-eslint/no-explicit-any */
import { createReducer, on } from '@ngrx/store';
import {
  loadUserRoles,
  loadUserRolesFailure,
  loadUserRolesSuccess,
} from '../../actions/users.actions';

export interface userRolesState {
  roles: any;
  loading: boolean;
  error: boolean;
  errorMessage: string | null;
}

export const initialState: userRolesState = {
  roles: null,
  loading: false,
  error: false,
  errorMessage: null,
};

const createUserRolesReducer = createReducer(
  initialState,
  on(loadUserRoles, () => ({
    ...initialState,
    loading: true,
  })),
  on(loadUserRolesSuccess, (state, { userRoles }) => ({
    ...state,
    roles: userRoles,
    loading: false,
  })),
  on(loadUserRolesFailure, (state, { error }) => ({
    ...initialState,
    loading: false,
    error: true,
    errorMessage:
      'Error while fetching user roles ' + JSON.stringify(error.detail),
  }))
);

export function userRolesReducer(state: any, action: any) {
  return createUserRolesReducer(state, action);
}
