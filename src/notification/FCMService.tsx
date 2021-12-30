import messaging from '@react-native-firebase/messaging';
import {Alert} from 'react-native';

export const requestUserPermission = async () => {
  const authStatus = await messaging().requestPermission();

  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;
  if (enabled) {
    getFcmToken();
    console.log('Authorization status:', authStatus);
  }
};

const getFcmToken = async () => {
  const fcmToken = await messaging().getToken();
  if (fcmToken) {
    console.log(fcmToken);
    console.log('Your Firebase Token is:', fcmToken);
  } else {
    console.log('Failed', 'No token received');
  }
};

export const unsubscribe = messaging().onMessage(async remoteMessage => {
  const notification = remoteMessage?.notification;
  const android = notification?.android;
  const body = notification?.body;
  const title = notification?.title;
  const imageUrl = android?.imageUrl;
  const newMessage = `
    ${imageUrl}
    ${title}
    ${body}
  `;
  // Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
  Alert.alert('A new FCM message arrived!', newMessage);
  console.log(`remoteMessage`, remoteMessage.notification);
});
