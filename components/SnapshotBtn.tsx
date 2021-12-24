import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

type SnapProps = {
  takePicture: () => Promise<void>;
};

const SnapshotBtn = ({takePicture}: SnapProps) => {
  return (
    <TouchableOpacity
      activeOpacity={0.5}
      style={styles.btnAlignment}
      onPress={takePicture}>
      <Icon name="camera" size={50} color="#fff" />
    </TouchableOpacity>
  );
};

export default SnapshotBtn;

const styles = StyleSheet.create({
  btnAlignment: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: 20,
  },
});
