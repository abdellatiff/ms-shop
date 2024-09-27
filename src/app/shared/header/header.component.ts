import { CommonModule, NgFor, NgIf } from '@angular/common';
import {
  Component,
  inject,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { CustomerComponent } from '../../pages/customer/customer.component';
import { Store } from '@ngrx/store';
import {
  selectCartItems,
  selectCartTotalItems,
} from '../../store/cart/shopping-cart.selector';
import { CartActions } from '../../store/cart/shopping-cart.actions';
import { selectIsAdmin, selectIsAuthenticated } from '../../store/auth/auth.selector';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [NgIf, RouterLink, CustomerComponent, NgFor,CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  private readonly oidcSecurityService = inject(OidcSecurityService);
  private readonly store = inject(Store);

  isAuthenticated$ = this.store.select(selectIsAuthenticated); // Authenticated observable
  cartItems$ = this.store.select(selectCartItems); // Cart items observable
  itemCount$ = this.store.select(selectCartTotalItems); // Total items count observable
  isAdmin$ = this.store.select(selectIsAdmin); // Admin observable

  // Login and logout methods
  login() {
    this.oidcSecurityService.authorize();
  }

  logout() {
    this.oidcSecurityService.logoff().subscribe((result) => {
      console.log('successfully logged out', result);
    });
  }

  // Dispatch an action to remove an item from the cart
  removeCartItem(itemId: number|undefined
    ): void {
    this.store.dispatch(CartActions.removeProduct({ productId: itemId }));
  }
}
