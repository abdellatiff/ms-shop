import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Customer } from '../../model/customer.model';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  private httpClient = inject(HttpClient);
  private apiUrl = 'http://localhost:8222/api/v1/customer';

  getCustomers(): Observable<Customer[]> {
    return this.httpClient.get<Customer[]>(this.apiUrl);
  }

  addCustomer(customer: Customer): Observable<Customer> {
    return this.httpClient.post<Customer>(this.apiUrl, customer);
  }

  existsByEmail(email: string): Observable<boolean> {
    return this.httpClient.get<boolean>(`${this.apiUrl}/exists/${email}`);
  }

  deleteCustomer(id: string|null): Observable<void> {
    return this.httpClient.delete<void>(`${this.apiUrl}/${id}`);
  }

  getCustomerByEmail(email: string): Observable<Customer> {
    return this.httpClient.get<Customer>(`${this.apiUrl}/email/${email}`);
  }
}
