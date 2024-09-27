import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Customer } from '../../model/customer.model';

export const CustomerActions = createActionGroup({
  source: '[Customer] Customer Actions',
  events: {
    'Load Customers': emptyProps(),
    'Load Authenticated Customer': props<{ customer: Customer }>(),
    'Check Or Create Customer': emptyProps(),
    'Load Selected Customer': props<{ customer: Customer }>(),
    'Load Customers Success': props<{ customers: Customer[] }>(),
    'Load Customers Failure': props<{ error: string }>(),
    'Add Customer': props<{ customer: Customer }>(),
    'Add Customer Success': props<{ customer: Customer }>(),
    'Add Customer Failure': props<{ error: string }>(),
    'Update Customer': props<{ customer: Customer }>(),
    'Update Customer Success': props<{ customer: Customer }>(),
    'Update Customer Failure': props<{ error: string }>(),
    'Delete Customer': props<{ customerId: string|null  }>(),
    'Delete Customer Success': props<{ customerId: string|null}>(),
    'Delete Customer Failure': props<{ error: string }>(),
    'Clear Authenticated Customer': emptyProps(),
    'Clear Selected Customer': emptyProps(),
  },
});
