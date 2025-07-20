import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {RootState} from '../../redux/reducers';

const CartIcon = () => {
  const navigation = useNavigation<any>();
  const cart = useSelector((state: RootState) => state.cartState);

  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => navigation.navigate('Cart')}>
      <Ionicons name="cart-outline" size={28} color="tomato" />
      {itemCount > 0 && (
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{itemCount}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 8,
  },
  badge: {
    position: 'absolute',
    top: 2,
    right: 2,
    backgroundColor: 'red',
    borderRadius: 10,
    minWidth: 18,
    height: 18,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 4,
  },
  badgeText: {
    color: 'white',
    fontSize: 11,
    fontWeight: 'bold',
  },
});

export default CartIcon;
