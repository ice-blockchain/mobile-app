// SPDX-License-Identifier: ice License 1.0

import {Touchable} from '@components/Touchable';
import {COLORS} from '@constants/colors';
import {commonStyles, windowWidth} from '@constants/styles';
import {CameraFeed} from '@screens/FaceRecognitionFlow/components/CameraFeed/CameraFeed';
import {Camera, CameraCapturedPicture} from 'expo-camera';
import React, {useRef, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {rem} from 'rn-units';

type Props = {
  onPictureTaken: (picture: CameraCapturedPicture) => void;
};

export function TakeSelfieStep({onPictureTaken}: Props) {
  const cameraRef = useRef<Camera>(null);
  const [isCameraReady, setIsCameraReady] = useState(false);
  const takePicture = async () => {
    if (cameraRef.current) {
      const facePhoto = await cameraRef.current.takePictureAsync({
        quality: 0.95,
      });
      onPictureTaken(facePhoto);
    }
  };
  return (
    <View style={commonStyles.flexOne}>
      <CameraFeed
        ref={cameraRef}
        onCameraReady={() => setIsCameraReady(true)}
      />
      {isCameraReady ? (
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
