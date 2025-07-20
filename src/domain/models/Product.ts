import {ImageSourcePropType} from 'react-native';

export interface Product {
  id: string;
  name: string;
  price: number;
  images: ImageSourcePropType[];
  tags: string[];
  category: string;
  description: string;
  isPopular?: boolean;
}
