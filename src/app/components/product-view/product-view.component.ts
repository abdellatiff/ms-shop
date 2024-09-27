import { Component, inject} from '@angular/core';
import { Product } from '../../model/product.model';
import { FormsModule } from '@angular/forms';
import { CommonModule, NgIf } from '@angular/common';
import { Store } from '@ngrx/store';
import { Observable, take } from 'rxjs';
import { selectSelectedProduct } from '../../store/product/products.selectors';
import { ProductsActions } from '../../store/product/products.actions';
import { CartActions } from '../../store/cart/shopping-cart.actions';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product-view',
  standalone: true,
  imports: [FormsModule, NgIf, CommonModule],
  templateUrl: './product-view.component.html',
  styleUrl: './product-view.component.css',
})
export class ProductViewComponent {
  private readonly store = inject(Store);
  private readonly toastr = inject(ToastrService);
  selectedProduct$: Observable<Product | null> = this.store.select(
    selectSelectedProduct
  );
  quantity: number = 1; // Dynamically added quantity

  addProductToCart(): void {
    this.selectedProduct$.pipe(take(1)).subscribe((product) => {
      if (!product) return;

      const eventData = {
        id: Date.now(),
        product: product,
        quantity: this.quantity,
      };

      // Dispatch action to add product to cart
      this.store.dispatch(CartActions.addProduct({ cartItem: eventData }));

      // Notification for successful addition
      this.toastr.success(
        `${eventData.product.name} added to the cart!`,
        'Success',
        {
          positionClass: 'toast-bottom-right',
        }
      );

      // Close modal after adding the product
      this.closeModal();
    });
  }

  closeModal(): void {
    this.quantity = 1;
    this.store.dispatch(ProductsActions.clearSelectedProduct());
  }
}
