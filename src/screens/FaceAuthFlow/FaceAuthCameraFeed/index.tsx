// SPDX-License-Identifier: ice License 1.0

import {CheckMark} from '@components/CheckMark';
import {Touchable} from '@components/Touchable';
import {COLORS} from '@constants/colors';
import {commonStyles, windowWidth} from '@constants/styles';
import {useNavigation} from '@react-navigation/native';
import {FaceAuthOverlay} from '@screens/FaceAuthFlow/FaceAuthCameraFeed/components/FaceAuthOverlay';
import {StatusOverlay} from '@screens/FaceAuthFlow/FaceAuthCameraFeed/components/StatusOverlay';
import {useCameraPermissions} from '@screens/Modals/QRCodeScanner/hooks/useCameraPermissions';
import {FaceAuthActions} from '@store/modules/FaceAuth/actions';
import {faceAuthStatusSelector} from '@store/modules/FaceAuth/selectors';
import {TokenomicsActions} from '@store/modules/Tokenomics/actions';
import {LogoIcon} from '@svg/LogoIcon';
import {RestartIcon} from '@svg/RestartIcon';
import {t} from '@translations/i18n';
import {Camera, CameraType} from 'expo-camera';
import React, {useEffect, useRef, useState} from 'react';
import {Image, StyleSheet, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {rem} from 'rn-units';

export function FaceAuthCameraFeed() {
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

  const {permissionsGranted} = useCameraPermissions();
  const [isLoading, setIsLoading] = useState(false);
  const faceAuthStatus = useSelector(faceAuthStatusSelector);
  useEffect(() => {
    setIsLoading(faceAuthStatus === 'LOADING');
  }, [faceAuthStatus]);

  const [faceAuthPictureUri, setFaceAuthPictureUri] = useState<string | null>(
    null,
  );
  const dispatch = useDispatch();
  const takePicture = async () => {
    if (cameraRef.current && isCameraReady) {
      setIsLoading(true); // setting loading here because taking and processing a picture also takes some time
      const facePhoto = await cameraRef.current.takePictureAsync({
        quality: 0.95,
      });
      setFaceAuthPictureUri(facePhoto.uri);
      dispatch(FaceAuthActions.FACE_AUTH.START.create({facePhoto}));
    }
  };

  const navigation = useNavigation();
  const onFaceAuthSuccess = () => {
    dispatch(TokenomicsActions.START_MINING_SESSION.START.create());
    navigation.goBack();
  };
  const onFaceAuthFailure = () => {
    dispatch(FaceAuthActions.RESET_FACE_AUTH_STATUS.STATE.create());
    setFaceAuthPictureUri(null);
  };
  return (
    <View style={commonStyles.flexOne}>
      {permissionsGranted && !faceAuthPictureUri ? (
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
      {permissionsGranted && !faceAuthPictureUri ? (
        <Touchable style={styles.cameraButton} onPress={takePicture} />
      ) : null}
      {faceAuthPictureUri ? (
        <Image source={{uri: faceAuthPictureUri}} style={styles.picture} />
      ) : null}
      {isLoading ? (
        <StatusOverlay
          description={t('face_auth.auth_status.loading.description')}
          titleIcon={
            <LogoIcon color={COLORS.white} width={rem(70)} height={rem(70)} />
          }
        />
      ) : null}
      {faceAuthStatus === 'SUCCESS' ? (
        <StatusOverlay
          description={t('face_auth.auth_status.success.description')}
          title={t('face_auth.auth_status.success.title')}
          actionText={t('face_auth.auth_status.success.action')}
          actionColor={COLORS.shamrock}
          actionIcon={
            <CheckMark fill={COLORS.shamrock} style={styles.checkmarkStyle} />
          }
          action={onFaceAuthSuccess}
        />
      ) : null}
      {faceAuthStatus === 'FAILED' ? (
        <StatusOverlay
          description={t('face_auth.auth_status.failure.description')}
          title={t('face_auth.auth_status.failure.title')}
          actionText={t('face_auth.auth_status.failure.action')}
          actionColor={COLORS.attention}
          actionIcon={
            <RestartIcon
              color={COLORS.white}
              width={rem(24)}
              height={rem(24)}
            />
          }
          action={onFaceAuthFailure}
        />
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
  picture: {
    width: '100%',
    height: '100%',
    transform: [{scaleX: -1}],
    position: 'absolute',
  },
  checkmarkStyle: {
    backgroundColor: COLORS.white,
  },
});
