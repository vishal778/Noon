import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CartIcon from './CartIcon';

interface HeaderProps {
  title: string;
  showBack?: boolean;
  showCart?: boolean;
}

const Header: React.FC<HeaderProps> = ({
  title,
  showBack = false,
  showCart = false,
}) => {
  const navigation = useNavigation();

  return (
    <View style={styles.header}>
      {showBack ? (
        <TouchableOpacity
          style={styles.side}
          onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
      ) : (
        <View style={styles.side} />
      )}

      <Text style={styles.title}>{title}</Text>

      {showCart ? <CartIcon /> : <View style={styles.side} />}
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    height: 56,
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  },
  side: {
    width: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Header;
