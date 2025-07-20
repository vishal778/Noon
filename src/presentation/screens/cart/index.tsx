import React from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
  SafeAreaView,
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

  const renderEmpty = () => (
    <View style={styles.emptyBox}>
      <Text style={styles.emptyText}>No items in cart</Text>
      <TouchableOpacity
        style={styles.goHomeBtn}
        onPress={() => navigation.navigate('Home')}>
        <Text style={styles.goHomeText}>Go to Home</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={{flex: 1}}>
      <Header title="Your Cart" showBack />
      <FlatList
        data={cart}
        renderItem={renderItem}
        keyExtractor={item => item.product.id}
        contentContainerStyle={{
          paddingBottom: cart.length > 0 ? 220 : 0,
          flexGrow: 1,
        }}
        ListEmptyComponent={renderEmpty}
      />

      {cart.length > 0 && (
        <View style={styles.summary}>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryText}>Subtotal</Text>
            <Text style={styles.summaryText}>₹{subtotal.toFixed(2)}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryText}>Tax (10%)</Text>
            <Text style={styles.summaryText}>₹{tax.toFixed(2)}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.totalText}>Total</Text>
            <Text style={styles.totalText}>₹{total.toFixed(2)}</Text>
          </View>

          <TouchableOpacity
            onPress={() => navigation.navigate('CartReview')}
            style={styles.checkoutBtn}>
            <Text style={styles.checkoutText}>Review Order</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
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
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  summaryText: {
    fontSize: 14,
    color: '#333',
  },
  totalText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#111',
    marginVertical: 6,
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
  emptyBox: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
  },
  goHomeBtn: {
    backgroundColor: 'tomato',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  goHomeText: {
    color: colors.white,
    fontWeight: '600',
    fontSize: 15,
  },
});

export default CartScreen;
