/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAction, props } from '@ngrx/store';

export enum usersActionTypes {
  LOAD_USERS_DATA = '[ Load Users ] Load Users Data',
  LOAD_USERS_DATA_SUCCESS = '[ Load Users Success ] Load Users Data Sucess',
  LOAD_USERS_DATA_FAILURE = '[ Load Users Failure ] Load Users Data Failure',

  GET_USER_DATA = '[ GET USER ] Get User Data',
  GET_USER_DATA_SUCCESS = '[ GET USER Success ] Get User Data Sucess',
  GET_USER_DATA_FAILURE = '[ GET USER Failure ] Get User Data Failure',

  LOAD_USER_ROLES = '[ Load User Roles ] Load User Roles Data',
  LOAD_USER_ROLES_SUCCESS = '[ Load User Roles Success ] Load Users Role Data Sucess',
  LOAD_USER_ROLES_FAILURE = '[ Load User Roles Failure ] Load Users Role Data Failure',

  SAVE_USER_DATA = '[ SAVE USER ] Save User Data',
  SAVE_USER_DATA_SUCCESS = '[ SAVE USER SUCCESS ] Save User Data Success',
  SAVE_USER_DATA_FAILURE = '[ SAVE USER FAILURE ] Save User Data Failure',

  DELETE_USER_DATA = '[ DELETE USER ] Delete User Data',
  DELETE_USER_DATA_SUCCESS = '[ DELETE USER SUCCESS ] Delet User Data Success',
  DELETE_USER_DATA_FAILURE = '[ DELETE USER FAILURE ] Delet User Data Failure',

  CLEAR_USER_DATA_STATE = '[ Clear User Data state] Clear User Data state data',
  CLEAR_USERS_STATE = '[ Clear Users state] Clear Users state data',
}

export const loadUsers = createAction(
  usersActionTypes.LOAD_USERS_DATA,
  props<{ params: any }>()
);

export const loadUsersSuccess = createAction(
  usersActionTypes.LOAD_USERS_DATA_SUCCESS,
  props<{ tableData: any }>()
);

export const loadUsersFailure = createAction(
  usersActionTypes.LOAD_USERS_DATA_FAILURE,
  props<{ error: any }>()
);

export const getUser = createAction(
  usersActionTypes.GET_USER_DATA,
  props<{ id: number }>()
);

export const getUserSuccess = createAction(
  usersActionTypes.GET_USER_DATA_SUCCESS,
  props<{ data: any }>()
);

export const getUserFailure = createAction(
  usersActionTypes.GET_USER_DATA_FAILURE,
  props<{ error: any }>()
);

export const loadUserRoles = createAction(usersActionTypes.LOAD_USER_ROLES);

export const loadUserRolesSuccess = createAction(
  usersActionTypes.LOAD_USER_ROLES_SUCCESS,
  props<{ userRoles: any }>()
);

export const loadUserRolesFailure = createAction(
  usersActionTypes.LOAD_USER_ROLES_FAILURE,
  props<{ error: any }>()
);

export const saveUser = createAction(
  usersActionTypes.SAVE_USER_DATA,
  props<{ userData: any }>()
);

export const saveUserSuccess = createAction(
  usersActionTypes.SAVE_USER_DATA_SUCCESS
);

export const saveUserFailure = createAction(
  usersActionTypes.SAVE_USER_DATA_FAILURE,
  props<{ error: any }>()
);

export const deleteUser = createAction(
  usersActionTypes.DELETE_USER_DATA,
  props<{ data: any }>()
);

export const deleteUserSuccess = createAction(
  usersActionTypes.DELETE_USER_DATA_SUCCESS,
  props<{ id: any }>()
);

export const deleteUserFailure = createAction(
  usersActionTypes.DELETE_USER_DATA_FAILURE,
  props<{ error: any }>()
);

export const clearUserDataState = createAction(
  usersActionTypes.CLEAR_USER_DATA_STATE
);

//clears the complete state on module destroyed and also can be called if state needs to be cleared
export const clearUserState = createAction(usersActionTypes.CLEAR_USERS_STATE);
