import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Cart, CartItem } from '../../model/cart.model';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartSubject = new BehaviorSubject<Cart>({ items: [] });
  cart$: Observable<Cart> = this.cartSubject.asObservable();
  private storageKey = 'shopping_cart';

  constructor() {
    // Load the cart from localStorage when the service is initialized
    const savedCart = localStorage.getItem(this.storageKey);
    if (savedCart) {
      this.cartSubject.next(JSON.parse(savedCart)); // Load saved cart into BehaviorSubject
    }
  }

  // Get current cart value
  getCart(): Cart {
    return this.cartSubject.getValue();
  }

  // Add item to cart
  addToCart(cartItem: CartItem): void {
    const currentCart = this.getCart();
    const existingItem = currentCart.items.find(item => item.product?.id === cartItem.product?.id);

    if (existingItem) {
      existingItem.quantity += cartItem.quantity; // Update quantity if product is already in the cart
    } else {
      currentCart.items.push(cartItem); // Add new item to the cart
    }
    console.log(this.cartSubject)
    this.cartSubject.next(currentCart);
    this.saveCart();// Notify all subscribers about the cart update
  }

  // Remove item from cart
  removeCartItem(itemId: number): void {
    const currentCart = this.getCart();
    currentCart.items = currentCart.items.filter(item => item.id !== itemId); // Remove item
    this.cartSubject.next(currentCart); // Notify all subscribers
    this.saveCart();
  }

  // Get total item count
  getItemCount(): number {
    return this.getCart().items.reduce((count, item) => count + item.quantity, 0); // Calculate total item count
  }

  private saveCart(): void {
    // Save the current cart to localStorage
    localStorage.setItem(this.storageKey, JSON.stringify(this.getCart()));
  }
}