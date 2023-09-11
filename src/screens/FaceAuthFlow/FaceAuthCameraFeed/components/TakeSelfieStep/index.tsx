// SPDX-License-Identifier: ice License 1.0

import {Touchable} from '@components/Touchable';
import {COLORS} from '@constants/colors';
import {commonStyles, windowWidth} from '@constants/styles';
import {FaceAuthOverlay} from '@screens/FaceAuthFlow/FaceAuthCameraFeed/components/FaceAuthOverlay';
import {useCameraPermissions} from '@screens/Modals/QRCodeScanner/hooks/useCameraPermissions';
import {Camera, CameraCapturedPicture, CameraType} from 'expo-camera';
import React, {useRef, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {rem} from 'rn-units';

type Props = {
  onPictureTaken: (picture: CameraCapturedPicture) => void;
};

export function TakeSelfieStep({onPictureTaken}: Props) {
  const {permissionsGranted} = useCameraPermissions();
  const cameraRef = useRef<Camera>(null);
  const [aspectRatio, setAspectRatio] = useState('16:9');
  const [isCameraReady, setIsCameraReady] = useState(false);
  const getSupportedRatios = async () => {
    if (cameraRef.current) {
      const ratios = await cameraRef.current.getSupportedRatiosAsync();
      if (!ratios.includes('16:9')) {
        setAspectRatio('4:3');
      }
    }
  };
  const takePicture = async () => {
    if (cameraRef.current && isCameraReady) {
      const facePhoto = await cameraRef.current.takePictureAsync({
        quality: 0.95,
      });
      onPictureTaken(facePhoto);
    }
  };
  return (
    <View style={commonStyles.flexOne}>
      {permissionsGranted ? (
        <Camera
          ref={cameraRef}
          onLayout={() => {
            getSupportedRatios();
          }}
          style={commonStyles.flexOne}
          ratio={aspectRatio}
          onCameraReady={() => setIsCameraReady(true)}
          type={CameraType.front}>
          <FaceAuthOverlay />
        </Camera>
      ) : null}
      {permissionsGranted ? (
        <Touchable style={styles.cameraButton} onPress={takePicture} />
      ) : null}
    </View>
  );
}

const BUTTON_SIZE = rem(100);

const styles = StyleSheet.create({
  cameraButton: {
    width: BUTTON_SIZE,
    height: BUTTON_SIZE,
    borderRadius: BUTTON_SIZE / 2,
    backgroundColor: COLORS.white,
    position: 'absolute',
    bottom: rem(40),
    left: windowWidth / 2 - BUTTON_SIZE / 2,
  },
});
