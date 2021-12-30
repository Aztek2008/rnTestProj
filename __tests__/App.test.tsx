// /**
//  * @format
//  */
import React from 'react';
import renderer from 'react-test-renderer';
import App from '../src/components/App';

// Avoiding ReferenceError: You are trying to `import` a file after the Jest environment has been torn down.
jest.useFakeTimers();

jest.mock(
  'react-native-vector-icons/FontAwesome',
  () => 'MockedFontAwesomeIcons',
);

test('App renders correctly', () => {
  const tree = renderer.create(<App />).toJSON();
  expect(tree).toMatchSnapshot();
});
