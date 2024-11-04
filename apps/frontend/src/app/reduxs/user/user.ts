import { environment } from '@frontend/configuration';
import { Role } from '@frontend/model';
import { createSlice } from '@reduxjs/toolkit';
import { isEmpty, omit } from 'lodash-es';

const userSlice = createSlice({
  name: 'user',
  initialState: null,
  reducers: {
    setUser: (state, action) => {
      return action.payload;
    },
    clearUser: () => null,
  },
});

const manageRoles = new Set(environment.manage);

/* eslint-disable-next-line */
export const getUserState = ({ user }: { user: any }) => omit(user, '_persist');

/* eslint-disable-next-line */
export const isUserAuthenticated = ({ user }: { user: any }) => {
  return !isEmpty(omit(user, '_persist'));
};

export const isAdmin = (state: { user: { roles: Role[] } | null }) => {
  const userRoles = state.user?.roles;
  if (userRoles) {
    return userRoles.some(({ slug }) => manageRoles.has(slug));
  }
  return false;
};

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
