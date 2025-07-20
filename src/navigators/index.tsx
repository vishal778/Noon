import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {RootStackParamList} from './types';
import HomeScreen from '../presentation/screens/home';
import SearchScreen from '../presentation/screens/search';
import ProductDetailsScreen from '../presentation/screens/productDetail';
import CartScreen from '../presentation/screens/cart';
import CartReviewScreen from '../presentation/screens/cartReview';
import ConfirmationScreen from '../presentation/screens/confirmation';

const Stack = createNativeStackNavigator<RootStackParamList>();

export const AppNavigators = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Search" component={SearchScreen} />
      <Stack.Screen name="ProductDetails" component={ProductDetailsScreen} />
      <Stack.Screen name="Cart" component={CartScreen} />
      <Stack.Screen name="CartReview" component={CartReviewScreen} />
      <Stack.Screen name="Confirmation" component={ConfirmationScreen} />
    </Stack.Navigator>
  );
};
