import { createSelector } from '@ngrx/store';

import { selectUsersFeature } from '..';

export const selectUsers = createSelector(
    selectUsersFeature,
    ({ usersData }) => usersData
);

export const selectUser = createSelector(
    selectUsersFeature,
    ({ userData }) => userData
);

export const selectUserRoles = createSelector(
    selectUsersFeature,
    ({ userRoles }) => userRoles
);