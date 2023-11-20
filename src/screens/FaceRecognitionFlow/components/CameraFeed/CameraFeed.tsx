// SPDX-License-Identifier: ice License 1.0

import {commonStyles, windowWidth} from '@constants/styles';
import {useCameraPermissions} from '@hooks/useCameraPermissions';
import {CameraPermissionNotice} from '@screens/FaceRecognitionFlow/components/CameraPermissionNotice';
import {FaceAuthOverlay} from '@screens/FaceRecognitionFlow/components/FaceAuthOverlay';
import {FaceRecognitionActions} from '@store/modules/FaceRecognition/actions';
import {cameraRatioSelector} from '@store/modules/FaceRecognition/selectors';
import {Camera, CameraType} from 'expo-camera';
import {activateKeepAwakeAsync, deactivateKeepAwake} from 'expo-keep-awake';
import React, {Ref, useEffect, useImperativeHandle, useRef} from 'react';
import {Platform, StyleSheet, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

type Props = {
  onCameraReady: () => void;
};

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

    const cameraRatio = useSelector(cameraRatioSelector);
    const dispatch = useDispatch();
    const getSupportedRatios = async () => {
      if (cameraRef.current && Platform.OS === 'android') {
        const ratios = await cameraRef.current
          .getSupportedRatiosAsync()
          .catch(() => [] as string[]); // catching here to set cameraRatio to '4:3'
        dispatch(
          FaceRecognitionActions.SET_CAMERA_RATIO.STATE.create({
            cameraRatio: ratios.includes('16:9') ? '16:9' : '4:3',
          }),
        );
      }
    };

    return permissionsGranted ? (
      <View
        style={
          cameraRatio === '4:3'
            ? cameraStyles.cameraContainer4to3
            : cameraStyles.cameraContainer16to9
        }>
        <Camera
          ref={cameraRef}
          style={commonStyles.flexOne}
          ratio={cameraRatio}
          onCameraReady={() => {
            getSupportedRatios();
            onCameraReady();
          }}
          type={CameraType.front}>
          <FaceAuthOverlay />
        </Camera>
      </View>
    ) : (
      <CameraPermissionNotice />
    );
  },
);
export const cameraStyles = StyleSheet.create({
  cameraContainer16to9: {
    width: windowWidth,
    height: (windowWidth * 16) / 9,
  },
  cameraContainer4to3: {
    width: windowWidth,
    height: (windowWidth * 4) / 3,
  },
});
