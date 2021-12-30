import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {setPictureUri, setPictureUris} from '../redux/PicturesSlice';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../components/NavBar';
import {RootState} from '../redux/ConfigureStore';
// import {Camera} from '../components/Camera';
import {
  View,
  Image,
  StyleSheet,
  SafeAreaView,
  TouchableHighlight,
  GestureResponderEvent,
} from 'react-native';
import {CameraTS} from '../components/CameraTS';

type ProfileScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Camera'
>;

export type NavProps = {
  navigation: ProfileScreenNavigationProp;
};

export type UriProps = {
  uri: string;
};

export type StringVoidFn = (event: GestureResponderEvent) => void;
export type VoidFn = () => void;
export type Item = {[key: string]: string};
export type User = {age: string; id: string; name: string};

const CameraScreen = ({navigation}: NavProps) => {
  const dispatch = useDispatch();
  const imageUri = useSelector((state: RootState) => state.uris.imageUri);
  const [takedUris, setTakedUris] = useState<string[]>([]); //snapshots uris component storage

  useEffect(() => {
    // effect
    return () => {
      // cleanup
    };
  }, []);

  useEffect(() => {
    dispatch(setPictureUris(takedUris)); // Save pictures uris to global state
  }, [takedUris]);

  const onPicture = ({uri}: UriProps) => {
    dispatch(setPictureUri(uri));

    setTakedUris(prev => [...prev, uri]); // Save snapshots uris to component state
  };

  const onBackToCamera = () => {
    dispatch(setPictureUri(''));
    navigation.navigate('Camera'); // Exit snapshot view
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={{flex: 1, width: '100%'}}>
        {imageUri ? (
          <TouchableHighlight style={{flex: 1}} onPress={onBackToCamera}>
            <Image source={{uri: imageUri}} style={{flex: 1}} />
          </TouchableHighlight>
        ) : (
          <CameraTS onPicture={onPicture} />
        )}
      </SafeAreaView>
    </View>
  );
};

export default CameraScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#323232',
  },
});
