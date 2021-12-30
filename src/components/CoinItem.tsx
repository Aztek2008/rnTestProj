import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {ICoin} from './types';

type CoinProps = {
  coin: ICoin;
};

const CoinItem: React.FC<CoinProps> = ({coin}) => {
  return (
    <View style={styles.containerItem}>
      <View style={styles.coinName}>
        <Image source={{uri: coin.image}} style={styles.image} />
        <View style={styles.containerNames}>
          <Text style={styles.text}>{coin.name}</Text>
          <Text style={styles.textSymbol}>{coin.symbol}</Text>
        </View>
      </View>
      <View>
        <Text style={styles.textPrice}>{coin.current_price}</Text>
        <Text
          style={[
            styles.pricePercentage,
            coin?.price_change_percentage_24h > 0
              ? styles.priceUp
              : styles.priceDown,
          ]}>
          {coin?.price_change_percentage_24h?.toFixed(2)}%
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  containerItem: {
    // backgroundColor: '#121212',
    paddingTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  containerNames: {
    marginLeft: 10,
  },
  coinName: {
    flexDirection: 'row',
  },
  text: {
    color: '#141414',
  },
  textPrice: {
    color: '#141414',
    fontWeight: 'bold',
  },
  pricePercentage: {
    textAlign: 'right',
  },
  priceUp: {
    color: '#00B589',
  },
  priceDown: {
    color: '#fc4422',
  },
  image: {
    width: 30,
    height: 30,
  },
  textSymbol: {
    color: '#c8cbfa',
    textTransform: 'uppercase',
  },
});

export default CoinItem;
