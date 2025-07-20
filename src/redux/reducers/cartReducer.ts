import {CartItem} from '../../domain/models/Cart';
import {Product} from '../../domain/models/Product';
import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  CLEAR_CART,
  INCREASE_QUANTITY,
  DECREASE_QUANTITY,
} from '../actions/cartActions';

type CartAction =
  | {type: typeof ADD_TO_CART; payload: {product: Product; quantity: number}}
  | {type: typeof REMOVE_FROM_CART; payload: string}
  | {type: typeof CLEAR_CART}
  | {type: typeof INCREASE_QUANTITY; payload: string}
  | {type: typeof DECREASE_QUANTITY; payload: string};

const initialState: CartItem[] = [];

const cartReducer = (state = initialState, action: CartAction): CartItem[] => {
  switch (action.type) {
    case ADD_TO_CART: {
      const {product, quantity} = action.payload;
      const existing = state.find(item => item.product.id === product.id);

      if (existing) {
        return state.map(item =>
          item.product.id === product.id
            ? {...item, quantity: item.quantity + quantity}
            : item,
        );
      } else {
        return [...state, {product, quantity}];
      }
    }
    case REMOVE_FROM_CART:
      return state.filter(item => item.product.id !== action.payload);

    case INCREASE_QUANTITY:
      return state.map(item =>
        item.product.id === action.payload
          ? {...item, quantity: item.quantity + 1}
          : item,
      );

    case DECREASE_QUANTITY:
      return state
        .map(item =>
          item.product.id === action.payload
            ? {...item, quantity: item.quantity - 1}
            : item,
        )
        .filter(item => item.quantity > 0);

    case CLEAR_CART:
      return [];

    default:
      return state;
  }
};

export default cartReducer;
