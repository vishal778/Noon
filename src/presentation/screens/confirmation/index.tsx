import React, {useEffect} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {useNavigation, CommonActions} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {clearCart} from '../../../redux/actions/cartActions';
import Header from '../../components/Header';

const ConfirmationScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch<any>();

  useEffect(() => {
    dispatch(clearCart()); // Clear cart when confirmation shows

    const timeout = setTimeout(() => {
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{name: 'Home'}],
        }),
      );
    }, 3000);

    return () => clearTimeout(timeout);
  }, [dispatch, navigation]);

  const handleGoHome = () => {
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{name: 'Home'}],
      }),
    );
  };

  return (
    <View style={styles.container}>
      <Header title="Order Confirmed" />

      <View style={styles.content}>
        <Text style={styles.title}>🎉 Thank you for your purchase!</Text>
        <Text style={styles.message}>
          Your order has been placed successfully.
        </Text>

        <TouchableOpacity onPress={handleGoHome} style={styles.btn}>
          <Text style={styles.btnText}>Go to Home Now</Text>
        </TouchableOpacity>

        <Text style={styles.timerText}>
          Redirecting to Home in 3 seconds...
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1},
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  message: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
    marginBottom: 20,
  },
  btn: {
    backgroundColor: 'tomato',
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginBottom: 12,
  },
  btnText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  timerText: {
    fontSize: 14,
    color: '#999',
  },
});

export default ConfirmationScreen;
