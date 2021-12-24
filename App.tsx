import React from 'react';
import {Provider} from 'react-redux';
import NavBar from './components/NavBar';
import {store} from './redux/ConfigureStore';
import {NavigationContainer} from '@react-navigation/native';
// import {StatusBar, useColorScheme} from 'react-native';

// import {Colors} from 'react-native/Libraries/NewAppScreen';

const App = () => {
  // const isDarkMode = useColorScheme() === 'dark';

  // const backgroundStyle = {
  //   backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  // };
  // style={backgroundStyle}>

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
