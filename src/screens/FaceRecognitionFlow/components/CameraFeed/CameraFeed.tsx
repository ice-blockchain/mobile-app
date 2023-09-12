// SPDX-License-Identifier: ice License 1.0

import {commonStyles} from '@constants/styles';
import {FaceAuthOverlay} from '@screens/FaceRecognitionFlow/components/FaceAuthOverlay';
import {useCameraPermissions} from '@screens/Modals/QRCodeScanner/hooks/useCameraPermissions';
import {Camera, CameraType} from 'expo-camera';
import React, {Ref, useImperativeHandle, useRef, useState} from 'react';

type Props = {
  onCameraReady: () => void;
};

export const CameraFeed = React.forwardRef(
  ({onCameraReady}: Props, forwardedRef: Ref<Camera | null>) => {
    const {permissionsGranted} = useCameraPermissions();
    const cameraRef = useRef<Camera>(null);
    useImperativeHandle(forwardedRef, () => cameraRef.current);
    const [aspectRatio, setAspectRatio] = useState('16:9');
    const getSupportedRatios = async () => {
      if (cameraRef.current) {
        const ratios = await cameraRef.current.getSupportedRatiosAsync();
        if (!ratios.includes('16:9')) {
          setAspectRatio('4:3');
        }
      }
    };

    return permissionsGranted ? (
      <Camera
        ref={cameraRef}
        onLayout={() => {
          getSupportedRatios();
        }}
        style={commonStyles.flexOne}
        ratio={aspectRatio}
        onCameraReady={onCameraReady}
        type={CameraType.front}>
        <FaceAuthOverlay />
      </Camera>
    ) : null;
  },
);
