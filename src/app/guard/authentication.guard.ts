import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { Store } from '@ngrx/store';
import { map, take } from 'rxjs';
import { selectIsAuthenticated } from '../store/auth/auth.selector';

export const authenticationGuard: CanActivateFn = (route, state) => {
  const store = inject(Store);
  return store.select(selectIsAuthenticated).pipe(
    take(1),
    map((isAuthenticated) => {
      if (isAuthenticated) {
        return true; // Grant access if user is authenticated
      } else {
        return false; // Block access
      }
    })
  );
};
