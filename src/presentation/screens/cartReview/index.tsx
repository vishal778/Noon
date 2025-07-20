import React from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Image,
  SafeAreaView,
} from 'react-native';
import {useSelector} from 'react-redux';
import {RootState} from '../../../redux/reducers';
import {CartItem} from '../../../domain/models/Cart';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../../navigators/types';
import Header from '../../components/Header';
import {calculateOrderSummary} from '../../../service/utils';

type NavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'CartReview'
>;

const CartReviewScreen = () => {
  const cartItems = useSelector((state: RootState) => state.cartState);
  const {subtotal, tax, total} = calculateOrderSummary(cartItems);
  const navigation = useNavigation<NavigationProp>();

  const renderItem = ({item}: {item: CartItem}) => (
    <View style={styles.item}>
      <View style={styles.itemText}>
        <Text style={styles.name}>{item.product.name}</Text>
        <Text>Qty: {item.quantity}</Text>
        <Text>Price: ₹{item.product.price * item.quantity}</Text>
      </View>
      <Image
        source={
          typeof item.product.images[0] === 'string'
            ? {uri: item.product.images[0]}
            : item.product.images[0]
        }
        style={styles.image}
      />
    </View>
  );

  return (
    <SafeAreaView style={{flex: 1}}>
      <Header title="Order Summary" showBack />
      <FlatList
        data={cartItems}
        keyExtractor={item => item.product.id}
        renderItem={renderItem}
        contentContainerStyle={styles.scrollContent}
      />

      <View style={styles.stickyFooter}>
        <View style={styles.paymentBox}>
          <Text style={styles.paymentLabel}>Payment Method</Text>
          <Text style={styles.paymentValue}>Cash on Delivery</Text>
        </View>

        <View style={styles.summaryBox}>
          <View style={styles.summaryRow}>
            <Text>Subtotal</Text>
            <Text>₹{subtotal.toFixed(2)}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text>Tax (10%)</Text>
            <Text>₹{tax.toFixed(2)}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.totalLabel}>Total</Text>
            <Text style={styles.totalLabel}>₹{total.toFixed(2)}</Text>
          </View>
        </View>

        <TouchableOpacity
          style={styles.confirmBtn}
          onPress={() => navigation.navigate('Confirmation')}>
          <Text style={styles.confirmText}>Confirm Order</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  scrollContent: {
    padding: 16,
    paddingBottom: 260,
  },
  item: {
    backgroundColor: '#fff',
    padding: 10,
    marginBottom: 12,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemText: {
    flex: 1,
    marginRight: 12,
  },
  name: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 4,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 8,
  },
  stickyFooter: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    padding: 16,
    backgroundColor: '#f6f6f6',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: -2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  paymentBox: {
    marginBottom: 12,
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
  },
  paymentLabel: {
    fontSize: 14,
    color: '#888',
    marginBottom: 4,
  },
  paymentValue: {
    fontWeight: '600',
    fontSize: 16,
  },
  summaryBox: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  totalLabel: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  confirmBtn: {
    backgroundColor: 'green',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  confirmText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default CartReviewScreen;
