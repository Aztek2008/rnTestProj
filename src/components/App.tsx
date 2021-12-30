import {Provider} from 'react-redux';
import React, {useEffect} from 'react';
import NavBar from './NavBar';
import {store} from '../redux/ConfigureStore';
import messaging from '@react-native-firebase/messaging';
import {NavigationContainer} from '@react-navigation/native';
import {Alert, StatusBar, Text, useColorScheme, View} from 'react-native';
import {requestUserPermission, unsubscribe} from '../notification/FCMService';
// import firebase from '@react-native-firebase';
// import {Colors} from 'react-native/Libraries/NewAppScreen';
// type Notification = {body: string; title: string} | undefined;

const App = () => {
  // const isDarkMode = useColorScheme() === 'dark';
  // const backgroundStyle = {
  //   backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  // };
  // style={backgroundStyle}>

  messaging().setBackgroundMessageHandler(async remoteMessage => {
    console.log('Message handled in the background!', remoteMessage);
  });

  useEffect(() => {
    requestUserPermission();

    return unsubscribe;
  }, []);

  return (
    <Provider store={store}>
      <NavigationContainer>
        {/* <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} /> */}
        <NavBar />
      </NavigationContainer>
    </Provider>
  );
};

export default App;
