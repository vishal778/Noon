import React from 'react';
import {View, FlatList, Image, StyleSheet, Dimensions} from 'react-native';

const {width} = Dimensions.get('window');

const BANNER_WIDTH = width * 0.9;
const BANNER_HEIGHT = 160;

const banners = [
  require('../../dls/assets/banner1.jpg'),
  require('../../dls/assets/banner2.jpg'),
  require('../../dls/assets/banner3.jpg'),
  require('../../dls/assets/banner4.jpg'),
];

const BannerSlider = () => {
  return (
    <View style={styles.container}>
      <FlatList
        data={banners}
        keyExtractor={(_, index) => index.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToInterval={BANNER_WIDTH + 16}
        decelerationRate="fast"
        bounces={false}
        renderItem={({item}) => (
          <Image source={item} style={styles.banner} resizeMode="cover" />
        )}
        ItemSeparatorComponent={() => <View style={{width: 12}} />}
        ListHeaderComponent={<View style={{width: 12}} />}
        ListFooterComponent={<View style={{width: 12}} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 16,
  },
  banner: {
    width: BANNER_WIDTH,
    height: BANNER_HEIGHT,
    borderRadius: 12,
  },
});

export default BannerSlider;
