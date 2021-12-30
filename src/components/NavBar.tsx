import React from 'react';
import {
  createNativeStackNavigator,
  NativeStackNavigationOptions,
} from '@react-navigation/native-stack';
import PictureStorageScreen from '../screens/PictureStorageScreen';
import UserDetailsScreen from '../screens/UserDetailsScreen';
import AllUsersScreen from '../screens/AllUsersScreen';
import AddUserScreen from '../screens/AddUserScreen';
import CameraScreen from '../screens/CameraScreen';
import MainScreen from '../screens/MainScreen';
import {User} from './UsersList';
import CryptoScreen from '../screens/CryptoScreen';

export type RootStackParamList = {
  Main: undefined;
  Add_User: undefined;
  All_Users: undefined;
  Details: {item: User};
  Camera: undefined;
  Pictures: undefined;
  Crypto: undefined;
};
const {Navigator, Screen} = createNativeStackNavigator<RootStackParamList>();

const NavBar = () => {
  return (
    <Navigator initialRouteName="Main">
      <Screen name="Main" component={MainScreen} options={headerOptions} />
      <Screen
        name="Add_User"
        component={AddUserScreen}
        options={headerOptions}
      />
      <Screen
        name="All_Users"
        component={AllUsersScreen}
        options={headerOptions}
      />
      <Screen
        name="Details"
        component={UserDetailsScreen}
        options={headerOptions}
      />
      <Screen name="Camera" component={CameraScreen} options={headerOptions} />
      <Screen
        name="Pictures"
        component={PictureStorageScreen}
        options={headerOptions}
      />
      <Screen name="Crypto" component={CryptoScreen} options={headerOptions} />
    </Navigator>
  );
};

const headerOptions: NativeStackNavigationOptions = {
  headerTitleAlign: 'center',
  headerStyle: {
    backgroundColor: '#88C1CB',
  },
  headerTintColor: '#fff',
  headerTitleStyle: {
    fontWeight: 'bold',
  },
};

export default NavBar;
