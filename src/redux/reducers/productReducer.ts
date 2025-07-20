import {Product} from '../../domain/models/Product';
import {
  ProductActionTypes,
  LOAD_PRODUCTS,
  SET_LOADING,
} from '../actions/productActions';

interface ProductState {
  products: Product[];
  loading: boolean;
}

const initialState: ProductState = {
  products: [],
  loading: false,
};

const productReducer = (
  state = initialState,
  action: ProductActionTypes,
): ProductState => {
  switch (action.type) {
    case LOAD_PRODUCTS:
      return {...state, products: action.payload};
    case SET_LOADING:
      return {...state, loading: action.payload};
    default:
      return state;
  }
};

export default productReducer;
