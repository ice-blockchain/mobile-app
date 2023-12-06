// SPDX-License-Identifier: ice License 1.0

import {COLORS} from '@constants/colors';
import {commonStyles} from '@constants/styles';
import {useNavigation} from '@react-navigation/native';
import {cameraStyles} from '@screens/FaceRecognitionFlow/components/CameraFeed/CameraFeed';
import {StatusOverlay} from '@screens/FaceRecognitionFlow/components/StatusOverlay';
import {useMaxHeightStyle} from '@screens/FaceRecognitionFlow/hooks/useMaxHeightStyle';
import {FaceRecognitionActions} from '@store/modules/FaceRecognition/actions';
import {
  cameraRatioSelector,
  faceAuthStatusSelector,
} from '@store/modules/FaceRecognition/selectors';
import {LogoIcon} from '@svg/LogoIcon';
import {RestartIcon} from '@svg/RestartIcon';
import {t} from '@translations/i18n';
import {CameraCapturedPicture} from 'expo-camera';
import React from 'react';
import {Image, StyleSheet, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {rem} from 'rn-units';

type Props = {
  picture: CameraCapturedPicture;
  onRetakePicture: () => void;
  onFaceAuthSuccess: () => void;
};

export function PictureSentStep({
  picture,
  onRetakePicture,
  onFaceAuthSuccess,
}: Props) {
  const faceAuthStatus = useSelector(faceAuthStatusSelector);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const onFaceAuthFailure = () => {
    dispatch(FaceRecognitionActions.RESET_FACE_AUTH_STATUS.STATE.create());
    onRetakePicture();
  };
  const onFaceAuthBanned = () => {
    navigation.goBack();
  };
  const onFaceAuthTryLater = () => {
    dispatch(FaceRecognitionActions.RESET_FACE_AUTH_STATUS.STATE.create());
    navigation.goBack();
  };

  const cameraRatio = useSelector(cameraRatioSelector);
  const maxHeightStyle = useMaxHeightStyle();
  return (
    <View style={[commonStyles.flexOne, maxHeightStyle.maxHeight]}>
      <View style={StyleSheet.absoluteFill}>
        <View
          style={
            cameraRatio === '4:3'
              ? cameraStyles.cameraContainer4to3
              : cameraStyles.cameraContainer16to9
          }>
          <Image
            resizeMode={'contain'}
            source={{uri: picture.uri}}
            style={styles.picture}
          />
          <View style={styles.pictureOverlay} />
        </View>
      </View>
      {faceAuthStatus === 'LOADING' ? (
        <StatusOverlay
          description={t('face_auth.auth_status.loading.description')}
          titleIcon={
            <LogoIcon color={COLORS.white} width={rem(70)} height={rem(70)} />
          }
        />
      ) : null}
      {faceAuthStatus === 'SUCCESS' ||
      faceAuthStatus === 'SUCCESS_BUT_SKIP_EMOTIONS' ? (
        <StatusOverlay
          description={t('face_auth.auth_status.continue.description')}
          title={t('face_auth.auth_status.continue.title')}
          actionText={t('face_auth.auth_status.continue.action')}
          actionColor={COLORS.shamrock}
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
      {faceAuthStatus === 'TRY_LATER' ? (
        <StatusOverlay
          description={t('face_auth.auth_status.try_later.description')}
          title={t('face_auth.auth_status.try_later.title')}
          actionText={t('face_auth.auth_status.try_later.action')}
          actionColor={COLORS.attention}
          action={onFaceAuthTryLater}
        />
      ) : null}
      {faceAuthStatus === 'BANNED' ? (
        <StatusOverlay
          description={t('face_auth.auth_status.banned.description')}
          title={t('face_auth.auth_status.banned.title')}
          actionText={t('face_auth.auth_status.banned.action')}
          actionColor={COLORS.attention}
          action={onFaceAuthBanned}
        />
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  picture: {
    ...StyleSheet.absoluteFillObject,
    transform: [{scaleX: -1}],
  },
  pictureOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: COLORS.primaryLight05opacity,
  },
});
