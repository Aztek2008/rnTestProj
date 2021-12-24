import React, {
  RefObject,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import {Alert, StyleSheet, View, Text, Linking, Button} from 'react-native';
import {UriProps} from '../screens/CameraScreen';
import {BarCodeReadEvent, RNCamera} from 'react-native-camera';
import SnapshotBtn from './SnapshotBtn';

interface ICamera {
  aspect: any;
  captureTarget: any;
  type: any;
  flashMode: any;
  orientation: any;
}

interface State {
  camera: ICamera;
  isRecording: boolean;
}

type CameraProps = {
  onPicture: (uri: UriProps) => void;
};

type Barcode = {
  bounds: {
    height: number;
    origin: {x: string; y: string}[];
    width: number;
  };
  data: string;
  rawData: string;
  target: number;
  type: string;
};

type UrlProps = {
  url: string;
  children: string;
};

const barcodeInit: Barcode = {
  bounds: {
    height: 0,
    origin: [{x: '', y: ''}],
    width: 0,
  },
  data: '',
  rawData: '',
  target: 0,
  type: '',
};

export const Camera: React.FC<CameraProps> = ({onPicture}) => {
  const [takingPic, setTakingPic] = useState(false);
  const [barcode, setBarcode] = useState<Barcode>(barcodeInit);
  const [sizeExist, setSizeExist] = useState<string>('');
  const [barcorRender, setBarcorRender] = useState<React.ReactFragment>('');
  const cameraRef = useRef() as RefObject<RNCamera>;

  // camera: ICamera;

  useEffect(() => {
    setSizeExist(barcode.bounds.origin[0].x);
    const render = renderBarcode(barcode);
    setBarcorRender(render);

    // console.log(`camera`, camera);

    return () => {
      // cleanup;
      // setTakingPic(false);
    };
  }, [barcode]);

  const takePicture = async () => {
    if (camera._isMounted && !takingPic) {
      console.log(`camera`, camera);
      const camOptions = {
        quality: 0.85,
        fixOrientation: true, //Android
        forceUpOrientation: true, //IOS
        orientation: 'landscapeLeft',
        pictureOrientation: 1,
        deviceOrientation: 1,
      };

      try {
        setTakingPic(true);
        const data = await camera.takePictureAsync(camOptions);
        onPicture(data);
      } catch (err) {
        Alert.alert('Error', 'Failed to take picture: ' + err);
        return;
      } finally {
        setTakingPic(false);
      }
    }
  };

  const barcodeRecognized = (event: BarCodeReadEvent & Barcode): void => {
    setBarcode(event);
    // console.log(`barcode`, barcode);
  };

  const renderBarcode = (event: Barcode) => (
    <React.Fragment key={event.data + event.bounds.origin[0].x}>
      <View style={styles.renderBarcode}>
        <Text style={styles.renderBerText}>
          <OpenURLButton url={event.data}>{event.data}</OpenURLButton>
        </Text>
      </View>
    </React.Fragment>
  );

  const OpenURLButton = ({url, children}: UrlProps) => {
    const handlePress = useCallback(async () => {
      // Checking if the link is supported for links with custom URL scheme.
      const supported = await Linking.canOpenURL(url);

      if (supported) {
        await Linking.openURL(url);
      } else {
        Alert.alert(`Don't know how to open this URL: ${url}`);
      }
    }, [url]);

    return <Button title={children} onPress={handlePress} />;
  };

  return (
    <RNCamera
      ref={cameraRef}
      captureAudio={false}
      style={{flex: 1}}
      type={RNCamera.Constants.Type.back}
      onBarCodeRead={barcodeRecognized}
      androidCameraPermissionOptions={{
        title: 'Permission to use camera',
        message: 'We need your permission to use your camera',
        buttonPositive: 'Ok',
        buttonNegative: 'Cancel',
      }}>
      {sizeExist.length > 0 && barcorRender}
      <SnapshotBtn takePicture={takePicture} />
    </RNCamera>
  );
};

const styles = StyleSheet.create({
  renderBarcode: {
    borderWidth: 2,
    borderRadius: 10,
    position: 'absolute',
    borderColor: '#F00',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    padding: 10,
    height: 300,
    width: 300,
    left: 20,
    top: 20,
  },
  renderBerText: {
    color: '#F00',
    flex: 1,
    position: 'absolute',
    left: '20%',
    textAlign: 'center',
    backgroundColor: 'transparent',
  },
});
