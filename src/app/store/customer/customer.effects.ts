import { inject, Injectable } from '@angular/core';
import { CustomerService } from '../../services/customer/customer.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  catchError,
  exhaustMap,
  map,
  of,
  switchMap,
  withLatestFrom,
} from 'rxjs';
import { CustomerActions } from './customer.actions';
import { Store } from '@ngrx/store';
import { selectUserData } from '../auth/auth.selector';

@Injectable()
export class CustomerEffects {
  constructor(private customerService: CustomerService) {}

  loadCustomers$ = createEffect(() =>
    inject(Actions).pipe(
      ofType(CustomerActions.loadCustomers),
      exhaustMap(() =>
        this.customerService.getCustomers().pipe(
          map((customers) =>
            CustomerActions.loadCustomersSuccess({ customers })
          ),
          catchError((error) =>
            of(CustomerActions.loadCustomersFailure({ error }))
          )
        )
      )
    )
  );

  addCustomer$ = createEffect(() =>
    inject(Actions).pipe(
      ofType(CustomerActions.addCustomer),
      exhaustMap(({ customer }) =>
        this.customerService.addCustomer(customer).pipe(
          map((customer) => CustomerActions.addCustomerSuccess({ customer })),
          catchError((error) =>
            of(CustomerActions.addCustomerFailure({ error }))
          )
        )
      )
    )
  );

  deleteCustomer$ = createEffect(() =>
    inject(Actions).pipe(
      ofType(CustomerActions.deleteCustomer),
      exhaustMap(({ customerId }) =>
        this.customerService.deleteCustomer(customerId).pipe(
          map(() => CustomerActions.deleteCustomerSuccess({ customerId })),
          catchError((error) =>
            of(CustomerActions.deleteCustomerFailure({ error }))
          )
        )
      )
    )
  );

  checkOrCreateCustomer$ = createEffect(() =>
    inject(Actions).pipe(
      ofType(CustomerActions.checkOrCreateCustomer), // Action that triggers this process
      withLatestFrom(inject(Store).select(selectUserData)), // Select userData from the store
      switchMap(([action, userData]) => {
        return this.customerService.existsByEmail(userData.email).pipe(
          switchMap((exists) => {
            if (exists) {
              // If customer exists, load them
              return this.customerService
                .getCustomerByEmail(userData.email)
                .pipe(
                  map((customer) =>
                    CustomerActions.loadAuthenticatedCustomer({ customer })
                  ),
                  catchError((error) =>
                    of(CustomerActions.loadCustomersFailure({ error }))
                  )
                );
            } else {
              // If the customer doesn't exist, create and load them
              const newCustomer = {
                id: null, // Backend manages ID
                firstName: userData.given_name,
                lastName: userData.family_name,
                email: userData.email,
                address: null,
              };

              return this.customerService.addCustomer(newCustomer).pipe(
                map((customer) =>
                  CustomerActions.loadAuthenticatedCustomer({ customer })
                ),
                catchError((error) =>
                  of(CustomerActions.addCustomerFailure({ error }))
                )
              );
            }
          }),
          catchError((error) =>
            of(CustomerActions.addCustomerFailure({ error }))
          )
        );
      })
    )
  );
}
