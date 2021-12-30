import React from 'react';
import {Alert, Modal, StyleSheet, View, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {SystemInfo} from './SystemInfo';

export type Props = {
  modalVisible: boolean;
  setModalVisible: (arg0: boolean) => void;
};

export const ModalView: React.FC<Props> = ({modalVisible, setModalVisible}) => {
  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        testID="infoModal"
        onRequestClose={() => {
          // Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View>
            <SystemInfo />
            <TouchableOpacity
              style={[styles.button]}
              onPress={() => setModalVisible(false)}>
              <Icon name="window-close" size={50} color="#323232" />
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    backgroundColor: 'white',
  },
  button: {
    alignItems: 'center',
    backgroundColor: 'transparent',
    padding: 10,
    margin: 10,
  },
});
