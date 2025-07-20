import React from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../../redux/reducers';
import {
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
} from '../../../redux/actions/cartActions';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../../navigators/types';
import Header from '../../components/Header';
import {calculateOrderSummary} from '../../../service/utils';
import colors from '../../../dls/colors';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Cart'>;

const CartScreen = () => {
  const dispatch = useDispatch<any>();
  const navigation = useNavigation<NavigationProp>();
  const cart = useSelector((state: RootState) => state.cartState);

  const {subtotal, tax, total} = calculateOrderSummary(cart);

  const renderItem = ({item}: any) => (
    <View style={styles.item}>
      <Image source={item.product.images[0]} style={styles.image} />
      <View style={styles.details}>
        <Text style={styles.name}>{item.product.name}</Text>
        <Text style={styles.price}>₹{item.product.price}</Text>

        <View style={styles.controls}>
          <TouchableOpacity
            onPress={() => dispatch(decreaseQuantity(item.product.id))}
            style={styles.qtyBtn}>
            <Text style={styles.qtyText}>-</Text>
          </TouchableOpacity>

          <Text style={styles.qty}>{item.quantity}</Text>

          <TouchableOpacity
            onPress={() => dispatch(increaseQuantity(item.product.id))}
            style={styles.qtyBtn}>
            <Text style={styles.qtyText}>+</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          onPress={() => dispatch(removeFromCart(item.product.id))}
          style={styles.removeBtn}>
          <Text style={styles.removeText}>Remove</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={{flex: 1}}>
      <Header title="Your Cart" showBack />
      <FlatList
        data={cart}
        renderItem={renderItem}
        keyExtractor={item => item.product.id}
        contentContainerStyle={{paddingBottom: 220}}
      />

      {cart.length > 0 && (
        <View style={styles.summary}>
          <Text style={styles.summaryText}>
            Subtotal: ₹{subtotal.toFixed(2)}
          </Text>
          <Text style={styles.summaryText}>Tax (10%): ₹{tax.toFixed(2)}</Text>
          <Text style={styles.totalText}>Total: ₹{total.toFixed(2)}</Text>

          <TouchableOpacity
            onPress={() => navigation.navigate('CartReview')}
            style={styles.checkoutBtn}>
            <Text style={styles.checkoutText}>Review Order</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    margin: 12,
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 10,
    elevation: 2,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 8,
  },
  details: {
    flex: 1,
    paddingLeft: 12,
  },
  name: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  price: {
    color: 'green',
    fontWeight: '600',
    marginVertical: 4,
  },
  controls: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 4,
  },
  qtyBtn: {
    backgroundColor: colors.greyeee,
    padding: 8,
    borderRadius: 6,
  },
  qtyText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  qty: {
    marginHorizontal: 12,
    fontSize: 16,
  },
  removeBtn: {
    marginTop: 8,
    paddingVertical: 4,
    paddingHorizontal: 10,
    backgroundColor: '#ffe6e6',
    borderRadius: 6,
    alignSelf: 'flex-start',
  },
  removeText: {
    color: 'tomato',
    fontSize: 13,
    fontWeight: '600',
  },
  summary: {
    backgroundColor: colors.white,
    padding: 16,
    borderTopWidth: 1,
    borderColor: colors.greyeee,
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
  summaryText: {
    fontSize: 14,
    marginBottom: 4,
  },
  totalText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 8,
  },
  checkoutBtn: {
    backgroundColor: 'tomato',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  checkoutText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '600',
  },
});

export default CartScreen;
