import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ProductsState } from './products.reducer';

export const selectProductsState =
  createFeatureSelector<ProductsState>('products');

export const selectProducts = createSelector(
  selectProductsState,
  ({ products }) => products
);

export const selectProductsLoading = createSelector(
  selectProductsState,
  ({ loading }) => loading
);

export const selectProductsError = createSelector(
  selectProductsState,
  ({ error }) => error
);

export const selectSelectedProduct = createSelector(
  selectProductsState,
  ({ selectedProduct }) => selectedProduct
);

export const selectSelectedProductById = createSelector(
    selectProductsState,
    ({ selectedProduct }) => selectedProduct
  );