import React, {useEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  Image,
  SafeAreaView,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../../redux/reducers';
import {loadProducts} from '../../../redux/actions/productActions';
import {Product} from '../../../domain/models/Product';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../../navigators/types';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Header from '../../components/Header';
import BannerSlider from '../../components/BannersSlider';
import colors from '../../../dls/colors';

type HomeNav = NativeStackNavigationProp<RootStackParamList, 'Home'>;

const HomeScreen = () => {
  const dispatch = useDispatch<any>();
  const navigation = useNavigation<HomeNav>();
  const {products, loading} = useSelector(
    (state: RootState) => state.productState,
  );

  useEffect(() => {
    dispatch(loadProducts());
  }, [dispatch]);

  const grouped = products.reduce((acc: Record<string, Product[]>, product) => {
    if (!acc[product.category]) acc[product.category] = [];
    acc[product.category].push(product);
    return acc;
  }, {});

  const renderProduct = ({item}: {item: Product}) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('ProductDetails', {product: item})}>
      <Image source={item.images?.[0]} style={styles.image} />
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.price}>₹{item.price}</Text>
      {item.tags.length > 0 && (
        <View style={styles.tag}>
          <Text style={styles.tagText}>{item.tags[0]}</Text>
        </View>
      )}
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="tomato" />
      </View>
    );
  }

  return (
    <SafeAreaView style={{flex: 1}}>
      <Header title="Home" showCart />
      <View style={styles.container}>
        <View style={styles.searchWrapper}>
          <TouchableOpacity
            style={styles.searchBar}
            onPress={() => navigation.navigate('Search')}>
            <Ionicons name="search" size={18} color={colors.grey66} />
            <Text style={styles.searchPlaceholder}>Search products...</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          ListHeaderComponent={
            <View>
              <BannerSlider />
              <Text style={styles.sectionTitle}>Popular Products</Text>
              <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                data={products.filter(p => p.isPopular)}
                keyExtractor={item => item.id}
                renderItem={renderProduct}
                contentContainerStyle={styles.horizontalList}
              />
            </View>
          }
          data={Object.entries(grouped)}
          keyExtractor={([category]) => category}
          renderItem={({item: [category, list]}) => (
            <View>
              <Text style={styles.sectionTitle}>{category}</Text>
              <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                data={list}
                keyExtractor={item => item.id}
                renderItem={renderProduct}
                contentContainerStyle={styles.horizontalList}
              />
            </View>
          )}
          contentContainerStyle={styles.scrollContainer}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: colors.whitef5},
  loaderContainer: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  scrollContainer: {paddingBottom: 40, paddingHorizontal: 12},
  searchWrapper: {paddingHorizontal: 12, paddingVertical: 8},
  searchBar: {
    backgroundColor: colors.white,
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 1,
  },
  searchPlaceholder: {
    marginLeft: 8,
    color: colors.grey66,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginVertical: 10,
    marginLeft: 4,
  },
  horizontalList: {
    paddingBottom: 8,
  },
  card: {
    backgroundColor: colors.white,
    width: 140,
    marginRight: 10,
    borderRadius: 8,
    padding: 10,
    elevation: 2,
  },
  image: {
    width: '100%',
    height: 100,
    borderRadius: 8,
    resizeMode: 'contain',
  },
  name: {
    fontWeight: '500',
    marginTop: 8,
    fontSize: 14,
  },
  price: {
    color: 'green',
    fontWeight: '600',
    fontSize: 13,
    marginTop: 4,
  },
  tag: {
    backgroundColor: 'tomato',
    alignSelf: 'flex-start',
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 2,
    marginTop: 6,
  },
  tagText: {
    color: colors.white,
    fontSize: 10,
    fontWeight: 'bold',
  },
});

export default HomeScreen;
