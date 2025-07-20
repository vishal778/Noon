import {Dispatch} from 'redux';
import {fetchProducts} from '../../data/services/productService';
import {Product} from '../../domain/models/Product';

export const LOAD_PRODUCTS = 'LOAD_PRODUCTS';
export const SET_LOADING = 'SET_LOADING';

interface LoadProductsAction {
  type: typeof LOAD_PRODUCTS;
  payload: Product[];
}

interface SetLoadingAction {
  type: typeof SET_LOADING;
  payload: boolean;
}

export type ProductActionTypes = LoadProductsAction | SetLoadingAction;

export const loadProducts = () => {
  return async (dispatch: Dispatch) => {
    dispatch({type: SET_LOADING, payload: true});
    const data = await fetchProducts();
    dispatch({type: LOAD_PRODUCTS, payload: data});
    dispatch({type: SET_LOADING, payload: false});
  };
};
