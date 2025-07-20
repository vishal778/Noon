import React, {useState, useEffect, useMemo} from 'react';
import {
  View,
  TextInput,
  FlatList,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';
import {useSelector} from 'react-redux';
import {RootState} from '../../../redux/reducers';
import {Product} from '../../../domain/models/Product';
import {useNavigation} from '@react-navigation/native';
import Header from '../../components/Header';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../../navigators/types';
import {debounce} from '../../../service/utils';
import colors from '../../../dls/colors';

type NavProp = NativeStackNavigationProp<RootStackParamList, 'Search'>;

const SearchScreen = () => {
  const navigation = useNavigation<NavProp>();
  const {products} = useSelector((state: RootState) => state.productState);
  const [query, setQuery] = useState('');
  const [filtered, setFiltered] = useState<Product[]>([]);

  const debouncedSearch = useMemo(
    () =>
      debounce((text: string) => {
        const keyword = text.trim().toLowerCase();
        if (keyword === '') {
          setFiltered([]);
        } else {
          setFiltered(
            products.filter(
              p =>
                p.name.toLowerCase().includes(keyword) ||
                p.description.toLowerCase().includes(keyword),
            ),
          );
        }
      }, 300),
    [products],
  );

  useEffect(() => {
    debouncedSearch(query);
  }, [query, debouncedSearch]);

  const renderItem = ({item}: {item: Product}) => (
    <TouchableOpacity
      style={styles.item}
      onPress={() => navigation.navigate('ProductDetails', {product: item})}>
      <Image source={item.images?.[0]} style={styles.image} />
      <View style={styles.details}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.price}>₹{item.price}</Text>
        <Text numberOfLines={1} style={styles.desc}>
          {item.description}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={{flex: 1}}>
      <Header title="Search" showBack showCart />

      <TextInput
        placeholder="Type to search..."
        value={query}
        onChangeText={setQuery}
        style={styles.input}
        autoFocus
      />

      <FlatList
        data={filtered}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        contentContainerStyle={{paddingBottom: 20}}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    margin: 12,
    padding: 10,
    borderRadius: 8,
    borderColor: colors.greycc,
    borderWidth: 1,
    backgroundColor: colors.white,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderBottomWidth: 1,
    borderColor: colors.greyeee,
  },
  image: {
    width: 64,
    height: 64,
    borderRadius: 8,
  },
  details: {
    flex: 1,
    marginLeft: 12,
  },
  name: {
    fontWeight: '600',
    fontSize: 15,
  },
  price: {
    color: 'green',
    marginTop: 2,
  },
  desc: {
    color: colors.grey66,
    fontSize: 12,
    marginTop: 2,
  },
});

export default SearchScreen;
