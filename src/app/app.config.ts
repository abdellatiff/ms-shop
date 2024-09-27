import {
  ApplicationConfig,
  isDevMode,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAuth } from 'angular-auth-oidc-client';
import { authConfig } from './config/config';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './interceptor/auth.interceptor';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { shoppingCartReducer } from './store/cart/shooping-cart.reducer';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { productsReducer } from './store/product/products.reducer';
import { ProductEffects } from './store/product/products.effects';
import { authReducer } from './store/auth/auth.reducer';
import { AuthEffects } from './store/auth/auth.effects';
import { customerReducer } from './store/customer/customer.reducer';
import { CustomerEffects } from './store/customer/customer.effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAuth(authConfig),
    provideHttpClient(withInterceptors([authInterceptor])),
    provideToastr({
      positionClass: 'toast-bottom-right', // Position the toast in the bottom-right corner
      timeOut: 3000, // Duration in milliseconds
      progressBar: true, // Show a progress bar
      progressAnimation: 'increasing', // Animate the progress bar
      closeButton: true, // Show a close button
      preventDuplicates: true, // Prevent duplicate notifications
      easing: 'ease-in', // Smooth easing for the animation
      tapToDismiss: true, // Allow dismissal by tapping the notification
    }),
    provideAnimations(),
    provideStore({
      shoppingCart: shoppingCartReducer,
      products: productsReducer,
      auth: authReducer,
      customer: customerReducer,
    }),
    provideEffects([ProductEffects, AuthEffects, CustomerEffects]),
    provideStoreDevtools({
      maxAge: 25, // Retains last 25 states
      logOnly: !isDevMode(), // Restrict extension to log-only mode
      autoPause: true, // Pauses recording actions and state changes when the extension window is not open
      trace: false, //  If set to true, will include stack trace for every dispatched action, so you can see it in trace tab jumping directly to that part of code
      traceLimit: 75, // maximum stack trace frames to be stored (in case trace option was provided as true)
      connectInZone: true, // If set to true, the connection is established within the Angular zone
    }),
  ],
};
