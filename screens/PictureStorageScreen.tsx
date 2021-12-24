import React from 'react';
import {useSelector} from 'react-redux';
import {RootState} from '../redux/ConfigureStore';
import {Image, StyleSheet, Text, TouchableHighlight, View} from 'react-native';

const PictureStorageScreen = () => {
  const imageUris: string[] = useSelector(
    (state: RootState) => state.uris.imageUris,
  );
  return (
    <View
      style={
        imageUris.length ? styles.containerForImages : styles.containerForText
      }>
      {imageUris.length ? (
        imageUris.map(imageUri => (
          <TouchableHighlight key={imageUri} style={styles.element}>
            <Image source={{uri: imageUri}} style={styles.elemContent} />
          </TouchableHighlight>
        ))
      ) : (
        <Text>No pictures here</Text>
      )}
    </View>
  );
};

export default PictureStorageScreen;

const styles = StyleSheet.create({
  containerForImages: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  containerForText: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  element: {
    width: '50%',
    paddingTop: '50%',
    position: 'relative',
  },
  elemContent: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '60%',
  },
});
