import { inject, Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { OidcSecurityService } from "angular-auth-oidc-client";
import { map, switchMap } from "rxjs";
import { AuthActions } from "./auth.actions";
import { jwtDecode } from "jwt-decode";

@Injectable()
export class AuthEffects {
  constructor(
    private oidcSecurityService: OidcSecurityService
  ) {}

  checkAuth$ = createEffect(() =>
    inject(Actions).pipe(
      ofType(AuthActions.checkAuth),
      switchMap(() =>
        this.oidcSecurityService.checkAuth().pipe(
          map(({ isAuthenticated, accessToken }) => {
            if (isAuthenticated) {
              const decodedToken: any = jwtDecode(accessToken);
              const roles = decodedToken?.realm_access?.roles || [];
              const userData = decodedToken;
              console.log('decodedToken', decodedToken);
              return AuthActions.loginSuccess({ userData, roles });
            } else {
              return AuthActions.loginFailure({ error: 'User not authenticated' });
            }
          })
        )
      )
    )
  );
}
