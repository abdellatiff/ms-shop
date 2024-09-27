import { Product } from '../../model/product.model';
import { ProductsActions } from './products.actions';
import { createReducer, on } from '@ngrx/store';

export interface ProductsState {
  products: Product[];
  loading: boolean;
  error: string;
  selectedProduct: Product | null;
}

const initialState: ProductsState = {
  products: [],
  loading: false,
  error: '',
  selectedProduct: null
};

export const productsReducer = createReducer(
  initialState,
  on(ProductsActions.loadProducts, (state) => ({
    ...state,
    products: [],
    loading: true,
    error: '',
  })),
  on(ProductsActions.loadProductsSuccess, (state, { products }) => ({
    ...state,
    products: products,
    loading: false,
    error: '',
  })),
  on(ProductsActions.loadProductsFailure, (state, { error }) => ({
    ...state,
    products: [],
    loading: false,
    error: error,
  })),
  on(ProductsActions.loadProduct, (state, { product }) => ({
    ...state,
    selectedProduct: product
  })),
  on(ProductsActions.loadProductById, (state, { productId }) => ({
    ...state,
    selectedProduct: state.products.find((product) => product.id === productId) || null
  })),
  on(ProductsActions.clearSelectedProduct, (state) => ({
    ...state,
    selectedProduct: null
  })),
);
