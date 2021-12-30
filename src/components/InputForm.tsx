import React, {useState} from 'react';
import axios from 'axios';
import {
  TouchableOpacity,
  Text,
  SafeAreaView,
  StyleSheet,
  TextInput,
} from 'react-native';

const InputForm = () => {
  const usersEndpoint = 'http://10.0.2.2:3000/users';
  const [user, setUser] = useState({
    name: '',
    age: '',
  });

  const saveUser = async () => {
    if (user.name.trim().length === 0 || user.age.trim().length === 0) {
      alert('Please fill all fields before saving');
      return;
    }
    console.log('Saving user...');

    await axios
      .post(usersEndpoint, user)
      .then(res => {
        // console.log(`res`, JSON.stringify(res, null, 2));
        alert(`${res.data} ${user.name}.`);
      })
      .catch(error => console.log(error))
      .finally(() => {
        console.log('User saved successfully...');
        setUser({
          name: '',
          age: '',
        });
      });
  };

  return (
    <SafeAreaView>
      <TextInput
        style={styles.input}
        onChangeText={text => setUser({...user, name: text})}
        placeholder="Type name here..."
        value={user.name}
      />
      <TextInput
        style={styles.input}
        onChangeText={text => setUser({...user, age: text})}
        value={user.age}
        placeholder="Type age here..."
        keyboardType="numeric"
      />
      <TouchableOpacity style={styles.button} onPress={saveUser}>
        <Text style={styles.buttonText}>Save user</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    width: 300,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#323232',
    padding: 10,
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
});

export default InputForm;
