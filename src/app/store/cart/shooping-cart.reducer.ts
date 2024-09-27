import { createReducer, on } from "@ngrx/store";
import { CartItem } from "../../model/cart.model";
import { CartActions } from './shopping-cart.actions';

export interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: []
};

export const shoppingCartReducer = createReducer(
  initialState,
  on(CartActions.addProduct, (state, { cartItem }) => {
    const existingItemIndex = state.items.findIndex(item => item.product?.id === cartItem.product?.id);

    let updatedItems;
    if (existingItemIndex > -1) {
      updatedItems = state.items.map((item, index) =>
        index === existingItemIndex
          ? { ...item, quantity: item.quantity + cartItem.quantity }
          : item
      );
    } else {
      updatedItems = [...state.items, cartItem];
    }

    return {
      ...state,
      items: updatedItems
    };
  }),

  on(CartActions.removeProduct, (state, { productId }) => {
    return {
      ...state,
      items: state.items.filter(item => item.product?.id !== productId)
    };
  }),

  on(CartActions.clearCart, (state) => ({
    ...state,
    items: []
  }))
);
