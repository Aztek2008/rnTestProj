import React, {useEffect, useState} from 'react';
import {
  GestureResponderEvent,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../components/NavBar';
import {ModalView} from '../components/Modal';

type ProfileScreenNavigationProp = StackNavigationProp<RootStackParamList>;

export type NavProps = {
  navigation: ProfileScreenNavigationProp;
};

type TabProps = {
  testID?: string;
  onPress?: ((event: GestureResponderEvent) => void) | undefined;
  iconName: string;
  children: string;
};

// MAIN SCREEN //
const MainScreen = ({navigation}: NavProps) => {
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  useEffect(() => {
    // Message
  }, []);
  const navigateTo = (route: keyof RootStackParamList) => {
    navigation.navigate(route);
  };
  const setStated = (event: boolean) => {
    setModalVisible(event);
  };

  const Tab = ({testID, onPress, iconName, children}: TabProps) => {
    return (
      <TouchableOpacity style={styles.button} testID={testID} onPress={onPress}>
        <View style={styles.buttonText}>
          <Icon name={iconName} size={50} color="#323232" />
          <Text>{children}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Tab
        testID="addUserBtn"
        onPress={() => navigateTo('Add_User')}
        iconName="edit"
        children="Add User"
      />
      <Tab
        testID="allUsersBtn"
        onPress={() => navigateTo('All_Users')}
        iconName="users"
        children="All Users"
      />
      <Tab
        testID="cameraBtn"
        onPress={() => navigateTo('Camera')}
        iconName="camera"
        children="Camera"
      />
      <Tab
        testID="picturesBtn"
        onPress={() => navigateTo('Pictures')}
        iconName="photo"
        children="Pictures"
      />
      <Tab
        testID="cryptoBtn"
        onPress={() => navigateTo('Crypto')}
        iconName="line-chart"
        children="Crypto"
      />
      <Tab
        onPress={() => setStated(true)}
        iconName="info"
        children="Device Info"
      />
      {modalVisible ? (
        <ModalView
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
        />
      ) : null}
    </View>
  );
};

export default MainScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    width: '50%',
    paddingTop: '50%',
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  buttonText: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
