// SPDX-License-Identifier: ice License 1.0

import {Touchable} from '@components/Touchable';
import {COLORS} from '@constants/colors';
import {commonStyles} from '@constants/styles';
import {CameraFeed} from '@screens/FaceRecognitionFlow/components/CameraFeed/CameraFeed';
import {DeviceAngleWarning} from '@screens/FaceRecognitionFlow/components/DeviceAngleWarning';
import {
  isSmallDevice,
  TAKE_SELFIE_BUTTON_SIZE,
} from '@screens/FaceRecognitionFlow/constants';
import {useIsDeviceAngleAllowed} from '@screens/FaceRecognitionFlow/hooks/useIsDeviceAngleAllowed';
import {useMaxHeightStyle} from '@screens/FaceRecognitionFlow/hooks/useMaxHeightStyle';
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
  const isDeviceAngleAllowed = useIsDeviceAngleAllowed(isCameraReady);

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
  const maxHeightStyle = useMaxHeightStyle();
  return (
    <View style={[commonStyles.flexOne, maxHeightStyle.maxHeight]}>
      <View style={StyleSheet.absoluteFill}>
        <CameraFeed
          ref={cameraRef}
          onCameraReady={() => setIsCameraReady(true)}
        />
      </View>
      {isCameraReady ? (
        <>
          <Touchable style={styles.cameraButton} onPress={takePicture} />
          {!isDeviceAngleAllowed && (
            <DeviceAngleWarning containerStyle={styles.warning} />
          )}
        </>
      ) : null}
    </View>
  );
}

const BOTTOM = isSmallDevice ? rem(20) : rem(40);

const styles = StyleSheet.create({
  cameraButton: {
    width: TAKE_SELFIE_BUTTON_SIZE,
    height: TAKE_SELFIE_BUTTON_SIZE,
    borderRadius: TAKE_SELFIE_BUTTON_SIZE / 2,
    backgroundColor: COLORS.white,
    position: 'absolute',
    bottom: BOTTOM,
    alignSelf: 'center',
  },
  warning: {
    position: 'absolute',
    bottom: BOTTOM,
    alignSelf: 'center',
    right: rem(16),
    left: rem(16),
  },
});
