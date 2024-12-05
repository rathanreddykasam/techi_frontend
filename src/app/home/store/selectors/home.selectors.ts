import { createSelector } from '@ngrx/store';
import { selectHomeFeature } from '..';

export const userPosts = createSelector(
  selectHomeFeature,
  ({ usersPosts }) => usersPosts
);
