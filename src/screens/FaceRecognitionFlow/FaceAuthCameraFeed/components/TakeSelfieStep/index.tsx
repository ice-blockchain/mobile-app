// SPDX-License-Identifier: ice License 1.0

import {Touchable} from '@components/Touchable';
import {COLORS} from '@constants/colors';
import {CameraFeed} from '@screens/FaceRecognitionFlow/components/CameraFeed/CameraFeed';
import {DeviceAngleWarning} from '@screens/FaceRecognitionFlow/components/DeviceAngleWarning';
import {useIsDeviceAngleAllowed} from '@screens/FaceRecognitionFlow/hooks/useIsDeviceAngleAllowed';
import {Camera, CameraCapturedPicture} from 'expo-camera';
import React, {useRef, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {rem} from 'rn-units';

type Props = {
  onPictureTaken: ({picture}: {picture: CameraCapturedPicture}) => void;
};

export function TakeSelfieStep({onPictureTaken}: Props) {
  const cameraRef = useRef<Camera>(null);
  const [isCameraReady, setIsCameraReady] = useState(false);
  const isDeviceAngleAllowed = useIsDeviceAngleAllowed();

  const takePicture = async () => {
    if (cameraRef.current) {
      const facePhoto = await cameraRef.current.takePictureAsync({
        quality: 0.95,
      });
      onPictureTaken({
        picture: facePhoto,
      });
    }
  };
  return (
    <View>
      <CameraFeed
        ref={cameraRef}
        onCameraReady={() => setIsCameraReady(true)}
      />
      {isCameraReady ? (
        <Touchable style={styles.cameraButton} onPress={takePicture} />
      ) : null}
      {!isDeviceAngleAllowed && (
        <DeviceAngleWarning containerStyle={styles.warning} />
      )}
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
    alignSelf: 'center',
  },
  warning: {
    position: 'absolute',
    bottom: rem(40),
    alignSelf: 'center',
    right: rem(16),
    left: rem(16),
  },
});
