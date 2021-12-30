import React from 'react';
import {StyleSheet, View} from 'react-native';
import {UserDetails} from '../components/UserDetails';

export type NavProps = {
  route: {
    key: string;
    name: string;
    params: {
      item: {
        age: string;
        id: string;
        name: string;
      };
    };
    path: undefined;
  };
};

const UserDetailsScreen = ({route}: NavProps) => {
  const {item} = route.params;
  return (
    <View style={styles.container}>
      <UserDetails item={item} />
    </View>
  );
};

export default UserDetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

// route: {
// "key": "Details-WXjAuWRv2sPzHFC7d4_LN",
// "name": "Details",
// "params": {
//   "item": {
//     "age": "33",
//     "id": "04844e3c-8007-4cf5-a7c9-5435cbeb57a4",
//     "name": "Cornelius"
//    }
//  },
// "path": undefined
// }
