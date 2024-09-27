import { createActionGroup, emptyProps, props } from '@ngrx/store';

export const AuthActions = createActionGroup({
  source: '[Auth] Auth Actions',
  events: {
    'CheckAuth': emptyProps(),
    'Login Success': props<{ userData: any, roles: string[] }>(),
    'Login Failure': props<{ error: string }>()
  },
});
