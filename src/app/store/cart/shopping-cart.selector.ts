import { createSelector, createFeatureSelector } from '@ngrx/store';
import { CartState } from './shooping-cart.reducer';

export const selectCartState = createFeatureSelector<CartState>('shoppingCart');

export const selectCartItems = createSelector(
  selectCartState,
  (state: CartState) => state.items
);

// Selector to calculate total number of items in the cart
export const selectCartTotalItems = createSelector(
  selectCartState,
  (state: CartState) =>
    state.items.reduce((total, item) => total + item.quantity, 0)
);
