import { inject, Injectable } from '@angular/core';
import { ProductService } from '../../services/product/product.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ProductsActions } from './products.actions';
import { catchError, exhaustMap, map, of } from 'rxjs';

@Injectable()
export class ProductEffects {
  constructor(
    private productsService: ProductService,
  ) {}

  loadProducts$ = createEffect(() =>
    inject(Actions).pipe(
      ofType(ProductsActions.loadProducts),
      exhaustMap(() =>
        this.productsService.getProducts().pipe(
          map((products) => ProductsActions.loadProductsSuccess({ products })),
          catchError((error) =>
            of(ProductsActions.loadProductsFailure({ error }))
          )
        )
      )
    )
  );
}
