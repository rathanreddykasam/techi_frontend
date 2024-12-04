/* eslint-disable @typescript-eslint/no-explicit-any */
import { isDevMode } from '@angular/core';
import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  MetaReducer,
} from '@ngrx/store';
import { homeActionTypes } from './actions/home.actions';
import { homeDataState, homeReducer } from './reducer/home.reducer';

export const homeFeatureKey = 'home';

export interface HomeState {
  usersPosts: homeDataState;
}

export const reducers: ActionReducerMap<HomeState> = {
  usersPosts: homeReducer,
};

export function clearState(reducer: ActionReducer<HomeState>): any {
  return (state: HomeState, action: any): any => {
    if (action.type === homeActionTypes.CLEAR_HOME_STATE) {
      state = undefined;
    }
    return reducer(state, action);
  };
}

export const metaReducers: MetaReducer<HomeState>[] = isDevMode()
  ? [clearState, logger]
  : [clearState];
export function logger(reducer: ActionReducer<HomeState>): any {
  return (state: HomeState, action: any): any => {
    const result = reducer(state, action);
    console.groupCollapsed(action.type);
    console.log('prev state', state);
    console.log('action', action);
    console.log('next state', result);
    console.groupEnd();

    return result;
  };
}

export const selectHomeFeature =
  createFeatureSelector<HomeState>(homeFeatureKey);
