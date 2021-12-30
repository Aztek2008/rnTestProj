import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {User} from './UsersList';

export const UserDetails = ({item}: {item: User}) => {
  const {name, age} = item;

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Hi!</Text>
      <Text style={styles.text}>{`I am ${name},`}</Text>
      <Text style={styles.text}>{`my age is ${age}`}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 32,
  },
});
