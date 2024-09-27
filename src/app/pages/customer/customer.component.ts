import { Component, inject, OnInit } from '@angular/core';
import { CustomerService } from '../../services/customer/customer.service';
import { Customer } from '../../model/customer.model';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import {
  selectCustomers,
  selectSelectedCustomer,
} from '../../store/customer/customer.selectors';
import { CustomerActions } from '../../store/customer/customer.actions';

@Component({
  selector: 'app-customer',
  standalone: true,
  imports: [CommonModule, TableModule, ButtonModule, DialogModule],
  templateUrl: './customer.component.html',
  styleUrl: './customer.component.css',
})
export class CustomerComponent implements OnInit {
  private readonly store = inject(Store);

  customers$: Observable<Customer[]> = this.store.select(selectCustomers);
  selectedCustomer$: Observable<Customer | null> = this.store.select(
    selectSelectedCustomer
  );
  displayDialog: boolean = false; // Add this to control visibility

  ngOnInit(): void {
    this.store.dispatch(CustomerActions.loadCustomers());
  }

  onViewCustomer(customer: Customer): void {
    this.store.dispatch(CustomerActions.loadSelectedCustomer({ customer }));
    this.displayDialog = true; // Show the dialog when a customer is selected
  }

  onDeleteCustomer(id: string|null): void {
    this.store.dispatch(CustomerActions.deleteCustomer({ customerId: id }));
  }

  closeDialog(): void {
    this.displayDialog = false; // Hide the dialog when it's closed
    this.store.dispatch(CustomerActions.clearSelectedCustomer());
  }
}
