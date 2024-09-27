import { Component, inject, Input } from '@angular/core';
import { Product } from '../../model/product.model';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { ProductsActions } from '../../store/product/products.actions';

@Component({
  selector: 'app-product-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-item.component.html',
  styleUrl: './product-item.component.css'
})
export class ProductItemComponent {

  private readonly store = inject(Store);
  @Input() product!: Product;


  onViewProduct(product: Product): void {
    console.log('View Product:', product);
    this.store.dispatch(
      ProductsActions.loadProduct({ product })
    );
  }
}
