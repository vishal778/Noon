import {Product} from '../domain/models/Product';

export type RootStackParamList = {
  Home: undefined;
  Search: undefined;
  ProductDetails: {product: Product};
  Cart: undefined;
  CartReview: undefined;
  Confirmation: undefined;
};
