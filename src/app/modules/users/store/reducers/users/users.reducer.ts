/* eslint-disable @typescript-eslint/no-explicit-any */
import { createReducer, on } from '@ngrx/store';
import {
  clearUserDataState,
  deleteUser,
  deleteUserFailure,
  deleteUserSuccess,
  getUser,
  getUserFailure,
  getUserSuccess,
  loadUsers,
  loadUsersFailure,
  loadUsersSuccess,
} from '../../actions/users.actions';

export interface usersDataState {
  users: any;
  loading: boolean;
  error: boolean;
  errorMessage: string | null;
}

export const initialUsersState: usersDataState = {
  users: null,
  loading: false,
  error: false,
  errorMessage: null,
};

const createUsersReducer = createReducer(
  initialUsersState,
  on(loadUsers, () => ({
    ...initialUsersState,
    loading: true,
  })),
  on(loadUsersSuccess, (state, { tableData }) => ({
    ...state,
    users: tableData,
    loading: false,
  })),
  on(loadUsersFailure, (state, { error }) => ({
    ...initialUsersState,
    loading: false,
    error: true,
    errorMessage: 'Error while fetching data ' + JSON.stringify(error.detail),
  })),
  on(deleteUser, (state) => ({
    ...state,
  })),

  on(deleteUserSuccess, (state, { id }) => ({
    ...state,
    users: state.users.filter((row) => row.Id !== id),
    loading: false,
  })),

  on(deleteUserFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error: true,
    errorMessage: 'Error while deleting data ' + JSON.stringify(error.detail),
  }))
);

export function usersReducer(state: any, action: any) {
  return createUsersReducer(state, action);
}

export interface userDataState {
  user: any;
  loading: boolean;
  error: boolean;
  errorMessage: string | null;
}

export const initialUserDataState: userDataState = {
  user: null,
  loading: false,
  error: false,
  errorMessage: null,
};

const createUserDataReducer = createReducer(
  initialUserDataState,
  on(getUser, () => ({
    ...initialUserDataState,
    loading: true,
  })),
  on(getUserSuccess, (state, { data }) => ({
    ...state,
    user: data,
    loading: false,
  })),
  on(getUserFailure, (state, { error }) => ({
    ...initialUserDataState,
    loading: false,
    error: true,
    errorMessage: 'Error while fetching data ' + JSON.stringify(error.detail),
  })),
  on(clearUserDataState, () => ({
    ...initialUserDataState,
  }))
);

export function userDataReducer(state: any, action: any) {
  return createUserDataReducer(state, action);
}
