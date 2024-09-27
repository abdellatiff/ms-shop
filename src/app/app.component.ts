import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './shared/header/header.component';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { ProductComponent } from './pages/products/product.component';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { Store } from '@ngrx/store';
import { AuthActions } from './store/auth/auth.actions';
import { CustomerActions } from './store/customer/customer.actions';
import { selectIsAuthenticated } from './store/auth/auth.selector';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  private store = inject(Store);
  private isAuthenticated$ = this.store.select(selectIsAuthenticated);

  ngOnInit(): void {
    this.store.dispatch(AuthActions.checkAuth());
    this.isAuthenticated$.subscribe((isAuthenticated) => {
      if (isAuthenticated) {
        this.store.dispatch(CustomerActions.checkOrCreateCustomer());
      }
    });
  }
}
