// SPDX-License-Identifier: ice License 1.0

import {commonStyles, windowWidth} from '@constants/styles';
import {FaceAuthOverlay} from '@screens/FaceRecognitionFlow/components/FaceAuthOverlay';
import {useCameraPermissions} from '@screens/Modals/QRCodeScanner/hooks/useCameraPermissions';
import {Camera, CameraType} from 'expo-camera';
import {activateKeepAwakeAsync, deactivateKeepAwake} from 'expo-keep-awake';
import React, {Ref, useEffect, useImperativeHandle, useRef} from 'react';
import {StyleSheet, View} from 'react-native';

type Props = {
  onCameraReady: () => void;
};

export const ASPECT_RATIO_HEIGHT = 16;
export const ASPECT_RATIO_WIDTH = 9;

export const CameraFeed = React.forwardRef(
  ({onCameraReady}: Props, forwardedRef: Ref<Camera | null>) => {
    const {permissionsGranted} = useCameraPermissions();
    const cameraRef = useRef<Camera>(null);
    useImperativeHandle(forwardedRef, () => cameraRef.current);

    useEffect(() => {
      if (permissionsGranted) {
        activateKeepAwakeAsync();
        return () => {
          deactivateKeepAwake();
        };
      }
    }, [permissionsGranted]);

    return permissionsGranted ? (
      <View style={cameraStyles.cameraContainer}>
        <Camera
          ref={cameraRef}
          style={commonStyles.flexOne}
          ratio={`${ASPECT_RATIO_HEIGHT}:${ASPECT_RATIO_WIDTH}`}
          onCameraReady={onCameraReady}
          type={CameraType.front}>
          <FaceAuthOverlay />
        </Camera>
      </View>
    ) : null;
  },
);

export const cameraStyles = StyleSheet.create({
  cameraContainer: {
    width: windowWidth,
    height: (windowWidth * ASPECT_RATIO_HEIGHT) / ASPECT_RATIO_WIDTH,
  },
});
