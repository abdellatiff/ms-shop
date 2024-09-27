import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Product } from '../../model/product.model';

export const ProductsActions = createActionGroup({
  source: '[Products] Products Actions',
  events: {
    'Load Products': emptyProps(),
    'Load Product': props<{ product: Product }>(),
    'Load Product By Id': props<{ productId: number }>(),
    'Load Products Success': props<{ products: Product[] }>(),
    'Load Products Failure': props<{ error: string }>(),
    'Add Product': props<{ product: Product }>(),
    'Add Product Success': props<{ product: Product }>(),
    'Add Product Failure': props<{ error: string }>(),
    'Update Product': props<{ product: Product }>(),
    'Update Product Success': props<{ product: Product }>(),
    'Update Product Failure': props<{ error: string }>(),
    'Delete Product': props<{ productId: number }>(),
    'Delete Product Success': props<{ productId: number }>(),
    'Delete Product Failure': props<{ error: string }>(),
    'Clear Selected Product': emptyProps(),
  },
});
