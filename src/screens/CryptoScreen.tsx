import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {
  FlatList,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import CoinItem from '../components/CoinItem';
import {ICoin} from '../components/types';

const CryptoScreen = () => {
  const [coins, setCoins] = useState<ICoin[]>([]);
  const [filteredCoins, setFilteredCoins] = useState<ICoin[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [search, setSearch] = useState('');
  const apiUri =
    'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false';

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    let coinArray = coins.filter(
      coin =>
        coin.name.toLowerCase().includes(search.toLocaleLowerCase()) ||
        coin.symbol.toLocaleLowerCase().includes(search.toLocaleLowerCase()),
    );

    setFilteredCoins(coinArray);
  }, [search]);

  const loadData = async () => {
    const res = await axios.get(apiUri);
    const data = await res.data;

    setCoins(data);
  };

  const renderItem = ({item}: {item: ICoin}) => {
    return <CoinItem coin={item} />;
  };

  return (
    <View style={styles.container}>
      {/* <StatusBar backgroundColor="#0e0275" /> */}

      <View style={styles.header}>
        <Text style={styles.title}>CryptoCurrencies</Text>
        <TextInput
          style={styles.searchInput}
          placeholder="Search Cryptos"
          placeholderTextColor="#858585"
          onChangeText={text => text && setSearch(text)}
        />
      </View>

      <FlatList
        style={styles.list}
        data={search.length ? filteredCoins : coins}
        showsVerticalScrollIndicator={false}
        renderItem={renderItem}
        refreshing={refreshing}
        onRefresh={async () => {
          setRefreshing(true);
          await loadData();
          setRefreshing(false);
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // backgroundColor: '#141414',
    flex: 1,
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    width: '90%',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  title: {
    fontSize: 20,
    color: '#141414',
    // color: '#fff',
    marginTop: 10,
  },
  list: {
    width: '90%',
  },
  searchInput: {
    color: '#141414',
    borderBottomColor: '#c8cbfa',
    borderBottomWidth: 1,
    width: '40%',
    textAlign: 'left',
  },
});

export default CryptoScreen;
