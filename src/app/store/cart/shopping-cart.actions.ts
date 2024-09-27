import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { CartItem } from "../../model/cart.model";


export const CartActions = createActionGroup({
    source : '[Cart] Cart Actions',
    events : {
        'Add Product': props<{cartItem : CartItem}>(),
        'Remove Product': props<{productId : number|undefined}>(),
        'Clear Cart':emptyProps()
    }
});