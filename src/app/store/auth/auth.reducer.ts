import { createReducer, on } from "@ngrx/store";
import { AuthActions } from "./auth.actions";



export interface AuthState {
    isAuthenticated: Boolean;
    userData: any;
    roles: string[];
    error: string;
}

const initialState: AuthState = {
    isAuthenticated: false,
    userData: null,
    roles: [],
    error: ''
};


export const authReducer = createReducer(
    initialState,
    on(AuthActions.checkAuth, (state) => ({
        ...state,
        isAuthenticated: false,
        userData: null,
        roles: [],
        error: ''
    })),
    on(AuthActions.loginSuccess, (state, { userData,roles }) => ({
        ...state,
        isAuthenticated: true,
        userData,
        roles,
        error: ''
    })),
    on(AuthActions.loginFailure, (state, { error }) => ({
        ...state,
        isAuthenticated: false,
        userData: null,
        roles: [],
        error
    }))
);