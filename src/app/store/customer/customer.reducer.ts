import { createReducer, on } from '@ngrx/store';
import { Customer } from '../../model/customer.model';
import { CustomerActions } from './customer.actions';

export interface CustomerState {
  customers: Customer[];
  loading: boolean;
  error: string;
  authenticatedCustomer: Customer | null;
  selectedCustomer: Customer | null;
}

export const initialState: CustomerState = {
  customers: [],
  loading: false,
  error: '',
  authenticatedCustomer: null,
  selectedCustomer: null,
};

export const customerReducer = createReducer(
  initialState,
  on(CustomerActions.loadCustomers, (state) => ({
    ...state,
    loading: true,
    error: '',
  })),
  on(CustomerActions.loadCustomersSuccess, (state, { customers }) => ({
    ...state,
    customers,
    loading: false,
    error: '',
  })),
  on(CustomerActions.loadCustomersFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  on(CustomerActions.loadAuthenticatedCustomer, (state, { customer }) => ({
    ...state,
    authenticatedCustomer: customer,
  })),
  on(CustomerActions.addCustomer, (state) => ({
    ...state,
    loading: true,
    error: '',
  })),
  on(CustomerActions.addCustomerSuccess, (state, { customer }) => ({
    ...state,
    customers: [...state.customers, customer],
    loading: false,
    error: '',
  })),
  on(CustomerActions.addCustomerFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  on(CustomerActions.updateCustomer, (state) => ({
    ...state,
    loading: true,
    error: '',
  })),
  on(CustomerActions.updateCustomerSuccess, (state, { customer }) => ({
    ...state,
    customers: state.customers.map((c) =>
      c.id === customer.id ? customer : c
    ),
    loading: false,
    error: '',
  })),
  on(CustomerActions.updateCustomerFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  on(CustomerActions.deleteCustomer, (state) => ({
    ...state,
    loading: true,
    error: '',
  })),
  on(CustomerActions.deleteCustomerSuccess, (state, { customerId }) => ({
    ...state,
    customers: state.customers.filter((c) => c.id !== customerId),
    loading: false,
    error: '',
  })),
  on(CustomerActions.deleteCustomerFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  on(CustomerActions.clearAuthenticatedCustomer, (state) => ({
    ...state,
    authenticatedCustomer: null,
  })),
  on(CustomerActions.loadSelectedCustomer, (state, { customer }) => ({
    ...state,
    selectedCustomer: customer,
  })),
    on(CustomerActions.clearSelectedCustomer, (state) => ({
        ...state,
        selectedCustomer: null,
    }))
);
