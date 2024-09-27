import { createFeatureSelector, createSelector } from "@ngrx/store";
import { CustomerState } from "./customer.reducer";


const selectCustomerState = createFeatureSelector<CustomerState>('customer');

export const selectCustomers = createSelector(
    selectCustomerState,
    ({ customers }) => customers
);

export const selectCustomersLoading = createSelector(
    selectCustomerState,
    ({ loading }) => loading
);


export const selectCustomersError = createSelector(
    selectCustomerState,
    ({ error }) => error
);

export const selectAuthenticatedCustomer = createSelector(
    selectCustomerState,
    ({ authenticatedCustomer }) => authenticatedCustomer
);

export const selectSelectedCustomer = createSelector(
    selectCustomerState,
    ({ selectedCustomer }) => selectedCustomer
);