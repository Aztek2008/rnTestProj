import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {StyleSheet, Text, View} from 'react-native';
import {UsersList} from '../components/UsersList';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../components/NavBar';
import {RouteProp} from '@react-navigation/native';

type ProfileScreenRouteProp = RouteProp<RootStackParamList, 'All_Users'>;

type ProfileScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'All_Users'
>;

export type NavProps = {
  navigation: ProfileScreenNavigationProp;
  route: ProfileScreenRouteProp;
};

const AllUsersScreen = ({navigation, route}: NavProps) => {
  const usersEndpoint = 'http://10.0.2.2:3000/users';
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getUsers();
  }, []);

  // GET
  const getUsers = async () => {
    const usersList = await axios.get(usersEndpoint);
    setUsers(usersList.data);
  };

  return (
    <View style={styles.container}>
      {users.length ? (
        <UsersList navigation={navigation} getUsers={getUsers} users={users} />
      ) : (
        <Text>No saved users</Text>
      )}
    </View>
  );
};

export default AllUsersScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
