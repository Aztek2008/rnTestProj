import axios from 'axios';
import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import {StackNavigationProp} from '@react-navigation/stack';
import {
  FlatList,
  GestureResponderEvent,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import {RootStackParamList} from './NavBar';
// import {NavProps} from '../screens/AllUsersScreen';

export type StringVoidFn = (event: GestureResponderEvent) => void;
export type VoidFn = () => void;
export type Item = {[key: string]: string};
export type User = {age: string; id: string; name: string};
export type ItemProps = {
  item: Item;
  onPress: StringVoidFn;
  deleteUser: StringVoidFn;
  backgroundColor: ViewStyle;
  textColor: ViewStyle;
};
type ProfileScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'All_Users'
>;

type UserListProps = {
  navigation: ProfileScreenNavigationProp;
  getUsers: VoidFn;
  users: User[];
};

const Item: React.FC<ItemProps> = ({
  item,
  onPress,
  deleteUser,
  backgroundColor,
  textColor,
}) => (
  <TouchableOpacity onPress={onPress} style={[styles.item, backgroundColor]}>
    <Text style={[styles.title, textColor]}>
      {item.name}, age {item.age}
    </Text>
    <TouchableOpacity style={styles.button} onPress={deleteUser}>
      <Icon name="remove" size={30} color="#323232" />
    </TouchableOpacity>
  </TouchableOpacity>
);

export const UsersList = ({navigation, getUsers, users}: UserListProps) => {
  const [selectedId, setSelectedId] = useState('');
  const usersEndpoint = 'http://10.0.2.2:3000/users';

  // SELECT
  const selectAndMoveToDetails = ({item}: {item: User}) => {
    setSelectedId(item.id);
    navigation.navigate('Details', {item}); //TODO:transition
  };
  // DELETE
  const deleteUser = async (name: string) => {
    await axios.delete(`${usersEndpoint}/${name}`);
    getUsers();
  };
  // RENDER ITEM
  const renderItem = ({item}: {item: User}) => {
    const backgroundColor = item.id === selectedId ? '#88C1CB' : 'transparent';
    const color = item.id === selectedId ? 'white' : 'black';

    return (
      <Item
        item={item}
        onPress={() => selectAndMoveToDetails({item})}
        deleteUser={() => deleteUser(item.name)}
        backgroundColor={{backgroundColor}}
        textColor={{color} as ViewStyle}
      />
    );
  };
  // RENDER LIST
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={users}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        extraData={selectedId}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 32,
  },
  button: {
    alignItems: 'center',
    backgroundColor: 'transparent',
    padding: 10,
  },
});
