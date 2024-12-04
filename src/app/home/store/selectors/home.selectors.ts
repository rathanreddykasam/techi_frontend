import { createSelector } from '@ngrx/store';
import { selectHomeFeature } from '..';

export const selectUsers = createSelector(
  selectHomeFeature,
  ({ usersPosts }) => usersPosts
);
