// SPDX-License-Identifier: ice License 1.0

import {Touchable} from '@components/Touchable';
import {COLORS} from '@constants/colors';
import {commonStyles} from '@constants/styles';
import {CameraFeed} from '@screens/FaceRecognitionFlow/components/CameraFeed/CameraFeed';
import {DeviceAngleWarning} from '@screens/FaceRecognitionFlow/components/DeviceAngleWarning';
import {TAKE_SELFIE_BUTTON_SIZE} from '@screens/FaceRecognitionFlow/constants';
import {useAbsoluteContentMarginBottom} from '@screens/FaceRecognitionFlow/hooks/useAbsoluteContentMarginBottom';
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
  const {marginBottomStyle, onMainContainerLayout} =
    useAbsoluteContentMarginBottom();
  return (
    <View style={commonStyles.flexOne} onLayout={onMainContainerLayout}>
      <CameraFeed
        ref={cameraRef}
        onCameraReady={() => setIsCameraReady(true)}
      />
      {isCameraReady ? (
        <View style={[StyleSheet.absoluteFill, marginBottomStyle.marginBottom]}>
          <Touchable style={styles.cameraButton} onPress={takePicture} />
          {!isDeviceAngleAllowed && (
            <DeviceAngleWarning containerStyle={styles.warning} />
          )}
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  cameraButton: {
    width: TAKE_SELFIE_BUTTON_SIZE,
    height: TAKE_SELFIE_BUTTON_SIZE,
    borderRadius: TAKE_SELFIE_BUTTON_SIZE / 2,
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
