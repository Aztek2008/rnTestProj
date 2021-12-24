import {StackNavigationProp} from '@react-navigation/stack';
import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import InputForm from '../components/InputForm';
import {RootStackParamList} from '../components/NavBar';

type ProfileScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'All_Users'
>;

type AddUserProps = {
  navigation: ProfileScreenNavigationProp;
};

const AddUserScreen = ({navigation}: AddUserProps) => {
  return (
    <View style={styles.container}>
      <Text style={{marginBottom: 12}}>ADD USER</Text>
      <InputForm />
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('All_Users')}>
        <Text style={styles.buttonText}>Go to All Users</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AddUserScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    alignItems: 'center',
    backgroundColor: 'transparent',
    padding: 10,
    margin: 10,
  },
  buttonText: {
    textTransform: 'uppercase',
  },
  buttonM: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
