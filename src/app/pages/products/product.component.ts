import { Component, inject, OnInit } from '@angular/core';
import { Product } from '../../model/product.model';
import { CommonModule, NgFor } from '@angular/common';
import { ProductItemComponent } from '../../components/product-list/product-item.component';
import { ProductViewComponent } from '../../components/product-view/product-view.component';
import { Store } from '@ngrx/store';
import {
  selectProducts,
  selectProductsLoading,
} from '../../store/product/products.selectors';
import { ProductsActions } from '../../store/product/products.actions';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [NgFor, CommonModule, ProductItemComponent, ProductViewComponent],
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent implements OnInit {
  
  private readonly store = inject(Store); // Inject the NgRx Store

  products$: Observable<Product[]> = this.store.select(selectProducts); // Select products from the store
  groupedProducts$: Observable<{ [category: string]: Product[] }> =
    this.products$.pipe(
      map((products) => this.groupProductsByCategory(products))
    ); // Group products by category using a pipe


  loading$ = this.store.select(selectProductsLoading);

  ngOnInit(): void {
    this.store.dispatch(ProductsActions.loadProducts());
  }

  groupProductsByCategory(products: Product[]): {
    [category: string]: Product[];
  } {
    return products.reduce((acc, product) => {
      const categoryName = product.category.name;
      if (!acc[categoryName]) {
        acc[categoryName] = [];
      }
      acc[categoryName].push(product);
      return acc;
    }, {} as { [category: string]: Product[] });
  }

  
}
