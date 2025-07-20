import React, {useMemo, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  FlatList,
  TouchableOpacity,
  ImageSourcePropType,
  SafeAreaView,
} from 'react-native';
import {useRoute, useNavigation, RouteProp} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {RootStackParamList} from '../../../navigators/types';
import {RootState} from '../../../redux/reducers';
import {addToCart, removeFromCart} from '../../../redux/actions/cartActions';
import Header from '../../components/Header';
import colors from '../../../dls/colors';

const {width} = Dimensions.get('window');

type ProductDetailsRouteProp = RouteProp<RootStackParamList, 'ProductDetails'>;

const ProductDetailsScreen = () => {
  const route = useRoute<ProductDetailsRouteProp>();
  const {product} = route.params;
  const dispatch = useDispatch<any>();
  const navigation = useNavigation<any>();

  const [currentIndex, setCurrentIndex] = useState(0);

  const cartItems = useSelector((state: RootState) => state.cartState);
  const cartItem = useMemo(
    () => cartItems.find(item => item.product.id === product.id),
    [cartItems, product.id],
  );
  const quantity = cartItem?.quantity ?? 0;

  const handleAddToCart = () => {
    dispatch(addToCart(product, 1));
  };

  const increaseQty = () => {
    dispatch(addToCart(product, 1));
  };

  const decreaseQty = () => {
    dispatch(removeFromCart(product.id));
  };

  const renderImage = ({item}: {item: ImageSourcePropType}) => (
    <Image source={item} style={styles.image} />
  );

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: colors.whitef9}}>
      <Header title="Product Details" showBack showCart />

      <View style={styles.carouselWrapper}>
        <FlatList
          data={product.images}
          renderItem={renderImage}
          horizontal
          pagingEnabled
          keyExtractor={(_, index) => index.toString()}
          showsHorizontalScrollIndicator={false}
          onScroll={e => {
            const index = Math.round(e.nativeEvent.contentOffset.x / width);
            setCurrentIndex(index);
          }}
        />

        <View style={styles.dots}>
          {product.images.map((_, index) => (
            <View
              key={index}
              style={[
                styles.dot,
                index === currentIndex ? styles.activeDot : null,
              ]}
            />
          ))}
        </View>
      </View>

      <View style={styles.details}>
        <Text style={styles.name}>{product.name}</Text>
        <Text style={styles.price}>₹{product.price}</Text>
        <Text style={styles.desc}>{product.description}</Text>

        {quantity === 0 ? (
          <TouchableOpacity
            onPress={handleAddToCart}
            style={styles.fullCartBtn}>
            <Text style={styles.cartText}>Add to Cart</Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.actionsRow}>
            <TouchableOpacity
              onPress={() => navigation.navigate('Cart')}
              style={styles.checkoutBtn}>
              <Text style={styles.cartText}>View Cart</Text>
            </TouchableOpacity>
            <View style={styles.qtyWrapper}>
              <TouchableOpacity onPress={decreaseQty}>
                <Text style={styles.qtyText}>-</Text>
              </TouchableOpacity>
              <Text style={styles.qtyValue}>{quantity}</Text>
              <TouchableOpacity onPress={increaseQty}>
                <Text style={styles.qtyText}>+</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  carouselWrapper: {
    height: 300,
    backgroundColor: colors.white,
  },
  image: {
    width,
    height: 300,
    resizeMode: 'contain',
  },
  dots: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 8,
  },
  dot: {
    width: 8,
    height: 8,
    backgroundColor: colors.greycc,
    borderRadius: 4,
    margin: 4,
  },
  activeDot: {
    backgroundColor: 'tomato',
  },
  details: {
    flex: 1,
    padding: 16,
    backgroundColor: colors.white,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    marginTop: 8,
    justifyContent: 'flex-end',
  },
  name: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  price: {
    color: 'green',
    fontWeight: '600',
    fontSize: 16,
    marginVertical: 4,
  },
  desc: {
    color: colors.grey444,
    fontSize: 14,
    marginBottom: 20,
  },
  fullCartBtn: {
    backgroundColor: 'tomato',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  cartText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '600',
  },
  actionsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  checkoutBtn: {
    width: '75%',
    backgroundColor: 'tomato',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginRight: 12,
  },
  qtyWrapper: {
    width: '25%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  qtyText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  qtyValue: {
    fontSize: 16,
    fontWeight: '600',
  },
});

export default ProductDetailsScreen;
