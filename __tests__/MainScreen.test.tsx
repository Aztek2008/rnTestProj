import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {render, fireEvent, RenderAPI} from '@testing-library/react-native';
import MainScreen from '../screens/MainScreen';

describe('MAIN SCREEN GROUP:', () => {
  const createTestProps = (props: Object) => ({
    navigation: {
      navigate: jest.fn(),
    },
    ...props,
  });

  let renderEl: RenderAPI;
  let props: any = createTestProps({});

  const getMenuTab = (testId: string) => renderEl.getByTestId(testId);

  const wrappedMainScreen = (
    <NavigationContainer>
      <MainScreen {...props} />
    </NavigationContainer>
  );

  describe('Main screen renders with all menu tabs', () => {
    beforeEach(() => {
      renderEl = render(wrappedMainScreen);
    });

    it('MAIN screen renders', () => {
      expect(renderEl).toBeTruthy();
    });
    it('ADD USER tab renders', () => {
      expect(getMenuTab('addUserBtn')).toBeTruthy();
    });
    it('ALL USERS tab renders', () => {
      expect(getMenuTab('allUsersBtn')).toBeTruthy();
    });
    it('DEVICE INFO tab renders', () => {
      expect(getMenuTab('infoBtn')).toBeTruthy();
    });
    it('CAMERA tab renders', () => {
      expect(getMenuTab('cameraBtn')).toBeTruthy();
    });
    it('PICTURES tab renders', () => {
      expect(getMenuTab('picturesBtn')).toBeTruthy();
    });
    it('CRYPTO tab renders', () => {
      expect(getMenuTab('cryptoBtn')).toBeTruthy();
    });
  });

  describe('All tabs navigate to their screens', () => {
    beforeEach(() => {
      renderEl = render(wrappedMainScreen);
    });

    it('ADD USER tab pressed', () => {
      fireEvent.press(getMenuTab('addUserBtn'));
      expect(props.navigation.navigate).toHaveBeenCalledWith('Add_User');
    });

    it('ALL USERS tab pressed', () => {
      fireEvent.press(getMenuTab('allUsersBtn'));
      expect(props.navigation.navigate).toHaveBeenCalledWith('All_Users');
    });

    it('DEVICE INFO tab pressed', () => {
      fireEvent.press(getMenuTab('infoBtn'));
      const modal = getMenuTab('infoModal');
      expect(modal).toBeTruthy();
    });

    it('CAMERA tab pressed', () => {
      fireEvent.press(getMenuTab('cameraBtn'));
      expect(props.navigation.navigate).toHaveBeenCalledWith('Camera');
    });

    it('PICTURES tab pressed', () => {
      fireEvent.press(getMenuTab('picturesBtn'));
      expect(props.navigation.navigate).toHaveBeenCalledWith('Pictures');
    });

    it('CRYPTO tab pressed', () => {
      fireEvent.press(getMenuTab('cryptoBtn'));
      expect(props.navigation.navigate).toHaveBeenCalledWith('Crypto');
    });
  });
});
