// SPDX-License-Identifier: ice License 1.0

import {CheckMark} from '@components/CheckMark';
import {Touchable} from '@components/Touchable';
import {COLORS} from '@constants/colors';
import {commonStyles} from '@constants/styles';
import {cameraStyles} from '@screens/FaceRecognitionFlow/components/CameraFeed/CameraFeed';
import {FaceAuthOverlay} from '@screens/FaceRecognitionFlow/components/FaceAuthOverlay';
import {useAbsoluteContentMarginBottom} from '@screens/FaceRecognitionFlow/hooks/useAbsoluteContentMarginBottom';
import {getPictureCropStartY} from '@screens/FaceRecognitionFlow/utils';
import {FaceRecognitionActions} from '@store/modules/FaceRecognition/actions';
import {cameraRatioSelector} from '@store/modules/FaceRecognition/selectors';
import {RestartIcon} from '@svg/RestartIcon';
import {t} from '@translations/i18n';
import {font} from '@utils/styles';
import {CameraCapturedPicture} from 'expo-camera';
import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {rem} from 'rn-units';

type Props = {
  picture: CameraCapturedPicture;
  onRetakePicture: () => void;
  onPictureSent: () => void;
};

export function SendOrRetakeStep({
  onRetakePicture,
  onPictureSent,
  picture,
}: Props) {
  const dispatch = useDispatch();
  const sendPicture = () => {
    dispatch(
      FaceRecognitionActions.FACE_AUTH.START.create({
        pictureUri: picture.uri,
        pictureWidth: picture.width,
        cropStartY: getPictureCropStartY({
          pictureWidth: picture.width,
          pictureHeight: picture.height,
        }),
      }),
    );
    onPictureSent();
  };

  const cameraRatio = useSelector(cameraRatioSelector);
  const {marginBottomStyle, onMainContainerLayout} =
    useAbsoluteContentMarginBottom();
  return (
    <View style={commonStyles.flexOne} onLayout={onMainContainerLayout}>
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
        <FaceAuthOverlay />
      </View>
      <View style={[styles.buttonContainer, marginBottomStyle.marginBottom]}>
        <Touchable
          onPress={onRetakePicture}
          style={[styles.button, styles.retakeButton]}>
          <RestartIcon color={COLORS.white} width={rem(24)} height={rem(24)} />
          <Text style={styles.text}>
            {t('face_auth.auth_status.failure.action')}
          </Text>
        </Touchable>
        <Touchable
          onPress={sendPicture}
          style={[styles.button, styles.sendButton]}>
          <CheckMark fill={COLORS.shamrock} style={styles.checkmarkStyle} />
          <Text style={styles.text}>
            {t('face_auth.auth_status.success.action')}
          </Text>
        </Touchable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  picture: {
    ...StyleSheet.absoluteFillObject,
    transform: [{scaleX: -1}],
  },
  buttonContainer: {
    position: 'absolute',
    bottom: rem(40),
    paddingHorizontal: rem(20),
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  button: {
    height: rem(40),
    width: '47%',
    borderRadius: rem(12),
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  retakeButton: {
    backgroundColor: COLORS.attention,
  },
  sendButton: {
    backgroundColor: COLORS.shamrock,
  },
  text: {
    marginStart: rem(8),
    ...font(14, 20, 'black', 'white', 'center'),
  },
  checkmarkStyle: {
    backgroundColor: COLORS.white,
  },
});
