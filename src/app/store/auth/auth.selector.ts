import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AuthState } from "./auth.reducer";


const selectAuthState = createFeatureSelector<AuthState>('auth');

export const selectIsAuthenticated = createSelector(
    selectAuthState,
    ({ isAuthenticated }) => isAuthenticated
);

export const selectUserName = createSelector(
    selectAuthState,
    ({ userData }) => userData?.preferred_username
);

export const selectUserData = createSelector(
    selectAuthState,
    ({ userData }) => userData
);

export const selectRoles = createSelector(
    selectAuthState,
    ({ roles }) => roles
);

export const selectError = createSelector(
    selectAuthState,
    ({ error }) => error
);


export const selectIsAdmin = createSelector(
    selectRoles,
    (roles) => roles.includes('ADMIN')
);

