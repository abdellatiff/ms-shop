import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import {
  selectRoles,
} from '../store/auth/auth.selector';
import { map, take } from 'rxjs/operators';

export const authorizationGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const store = inject(Store);

  return store.select(selectRoles).pipe(
    take(1),
    map((roles) => {
      if (roles.includes('ADMIN')) {
        return true; // Grant access if user has 'ADMIN' role
      } else {
        router.navigate(['/unauthorized']); // Redirect if no admin role
        return false; // Block access
      }
    })
  );
};
