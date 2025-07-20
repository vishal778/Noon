import {Product} from '../../domain/models/Product';
import {products} from '../products';

export const fetchProducts = (): Promise<Product[]> =>
  new Promise(resolve => {
    setTimeout(() => resolve(products), 1000);
  });

export const searchProducts = (query: string): Promise<Product[]> =>
  new Promise(resolve => {
    setTimeout(() => {
      const result = products.filter(p =>
        p.name.toLowerCase().includes(query.toLowerCase()),
      );
      resolve(result);
    }, 500);
  });
