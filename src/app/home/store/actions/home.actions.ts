/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAction, props } from '@ngrx/store';

export enum homeActionTypes {
  LOAD_HOME_POSTS = '[ LOAD HOME POSTS ] Load Home Posts Data',
  LOAD_HOME_POSTS_SUCCESS = '[ LOAD HOME POSTS SUCCESS ] Load Home Posts Data Sucess',
  LOAD_HOME_POSTS_FAILURE = '[ LOAD HOME POSTS FAILURE ] Load Home Posts Data Failure',

  CLEAR_HOME_STATE = '[ CLEAR HOME STATE ] Clear Home state data',
}

export const loadHomePosts = createAction(homeActionTypes.LOAD_HOME_POSTS);

export const loadHomePostsSuccess = createAction(
  homeActionTypes.LOAD_HOME_POSTS_SUCCESS,
  props<{ tableData: any }>()
);

export const loadHomePostsFailure = createAction(
  homeActionTypes.LOAD_HOME_POSTS_FAILURE,
  props<{ error: any }>()
);

//clears the complete state on module destroyed and also can be called if state needs to be cleared
export const clearHomeState = createAction(homeActionTypes.CLEAR_HOME_STATE);
