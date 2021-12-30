import * as React from 'react';
import {
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
  ViewProps,
  Text,
} from 'react-native';
import {RNCamera, RNCameraProps} from 'react-native-camera';
import {useCamera} from 'react-native-camera-hooks';
import {CameraOptions} from 'react-native-camera-hooks/src/initialState';
import {TakePictureResponse} from 'react-native-camera-hooks/src/takePicture';
import {UriProps} from '../screens/CameraScreen';
import SnapshotBtn from './SnapshotBtn';

type Autofocus = {
  autoFocus: 'on' | 'off' | undefined;
};

// type CameraFn = {
//   onPicture: (uri: UriProps) => {};
// };

type InitialProps = {
  // initialProps: CameraOptions & Readonly<RNCameraProps & ViewProps>;
  onPicture: (data: TakePictureResponse) => void;
};

export const CameraTS = ({onPicture}: InitialProps) => {
  React.useEffect(() => {
    // effect
    return () => {
      // cleanup
    };
  }, []);

  const [
    {cameraRef, type, ratio, autoFocus, autoFocusPoint, isRecording},
    {
      toggleFacing,
      touchToFocus,
      textRecognized,
      facesDetected,
      takePicture,
      setIsRecording,
    },
  ] = useCamera();

  const cameraPermissions = {
    title: 'Permission to use camera',
    message: 'We need your permission to use your camera',
    buttonPositive: 'Ok',
    buttonNegative: 'Cancel',
  };

  const cameraOptions = {
    quality: 0.85,
    fixOrientation: true, //Android
    forceUpOrientation: true, //IOS
    orientation: 'landscapeLeft',
    pictureOrientation: 1,
    deviceOrientation: 1,
  };

  const Touchables = () => (
    <>
      <Text>
        <TouchableWithoutFeedback
          style={{
            flex: 1,
          }}
          onPress={touchToFocus}
        />
      </Text>

      <TouchableOpacity
        testID="button"
        onPress={toggleFacing}
        style={{width: '100%', height: 45}}>
        {type}
      </TouchableOpacity>

      {!isRecording && (
        <TouchableOpacity
          onPress={async () => {
            try {
              setIsRecording(true);
              const data = await takePicture(cameraOptions);
              onPicture(data);
              console.warn(data);
            } catch (error) {
              console.warn(error);
            } finally {
              setIsRecording(false);
            }
          }}
          style={{width: '100%', height: 45}}
        />
      )}
    </>
  );

  const takePicture_ = async () => {
    if (!isRecording) {
      try {
        setIsRecording(true);
        const data = await takePicture(cameraOptions);
        onPicture(data);
        console.warn(data);
      } catch (error) {
        console.warn(error);
      } finally {
        setIsRecording(false);
      }
    }
  };

  return (
    // <View style={{flex: 1}}>
    <RNCamera
      ref={cameraRef}
      captureAudio={false}
      // autoFocusPointOfInterest={autoFocusPoint.normalized}
      type={type}
      ratio={ratio}
      style={{flex: 1}}
      // autoFocus={autoFocus}
      // onTextRecognized={textRecognized}
      // onFacesDetected={facesDetected}
      androidCameraPermissionOptions={cameraPermissions}>
      <SnapshotBtn takePicture={takePicture_} />
      {/* <Touchables /> */}
      {/* <>
          <TouchableWithoutFeedback
            style={{
              flex: 1,
            }}
            onPress={touchToFocus}
          />

          <TouchableOpacity
            testID="button"
            onPress={toggleFacing}
            style={{width: '100%', height: 45}}>
            {type}
          </TouchableOpacity>

          {!isRecording && (
            <TouchableOpacity
              onPress={async () => {
                try {
                  setIsRecording(true);
                  const data = await takePicture(cameraOptions);
                  onPicture(data);
                  console.warn(data);
                } catch (error) {
                  console.warn(error);
                } finally {
                  setIsRecording(false);
                }
              }}
              style={{width: '100%', height: 45}}
            />
          )}
        </> */}
    </RNCamera>
    // </View>
  );
};
