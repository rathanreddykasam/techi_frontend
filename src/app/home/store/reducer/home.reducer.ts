/* eslint-disable @typescript-eslint/no-explicit-any */
import { createReducer, on } from '@ngrx/store';
import {
  loadHomePosts,
  loadHomePostsFailure,
  loadHomePostsSuccess,
} from '../actions/home.actions';

export interface homeDataState {
  usersPosts: any;
  loading: boolean;
  error: boolean;
  errorMessage: string | null;
}

export const initialState: homeDataState = {
  usersPosts: null,
  loading: false,
  error: false,
  errorMessage: null,
};

const createHomeReducer = createReducer(
  initialState,
  on(loadHomePosts, () => ({
    ...initialState,
    loading: true,
  })),
  on(loadHomePostsSuccess, (state, { tableData }) => ({
    ...state,
    usersPosts: tableData,
    loading: false,
  })),
  on(loadHomePostsFailure, (state, { error }) => ({
    ...initialState,
    loading: false,
    error: true,
    errorMessage: 'Error while fetching data ' + JSON.stringify(error.detail),
  }))
);

export function homeReducer(state: any, action: any) {
  return createHomeReducer(state, action);
}
