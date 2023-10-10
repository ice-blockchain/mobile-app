// SPDX-License-Identifier: ice License 1.0

import {COLORS} from '@constants/colors';
import {commonStyles} from '@constants/styles';
import {Header} from '@navigation/components/Header';
import {PictureSentStep} from '@screens/FaceRecognitionFlow/FaceAuthCameraFeed/components/PictureSentStep';
import {SendOrRetakeStep} from '@screens/FaceRecognitionFlow/FaceAuthCameraFeed/components/SendOrRetakeStep';
import {TakeSelfieStep} from '@screens/FaceRecognitionFlow/FaceAuthCameraFeed/components/TakeSelfieStep';
import {t} from '@translations/i18n';
import {CameraCapturedPicture} from 'expo-camera';
import React, {useState} from 'react';
import {View} from 'react-native';

type FaceAuthPhase = 'TAKE_SELFIE' | 'SEND_OR_RETAKE' | 'SENT';

type Props = {
  updateKycStepPassed: () => void;
};

export function FaceAuthCameraFeed({updateKycStepPassed}: Props) {
  const [faceAuthPhase, setFaceAuthPhase] =
    useState<FaceAuthPhase>('TAKE_SELFIE');

  const [faceAuthPicture, setFaceAuthPicture] =
    useState<CameraCapturedPicture | null>(null);
  const onPictureTaken = async ({
    picture,
  }: {
    picture: CameraCapturedPicture;
  }) => {
    setFaceAuthPicture(picture);
    setFaceAuthPhase('SEND_OR_RETAKE');
  };
  const onRetakePicture = async () => {
    setFaceAuthPhase('TAKE_SELFIE');
    setFaceAuthPicture(null);
  };
  const onPictureSent = async () => {
    setFaceAuthPhase('SENT');
  };
  return (
    <View style={commonStyles.flexOne}>
      <Header
        color={COLORS.primaryDark}
        title={t('face_auth.header')}
        backgroundColor={'transparent'}
      />
      {faceAuthPhase === 'TAKE_SELFIE' ? (
        <TakeSelfieStep onPictureTaken={onPictureTaken} />
      ) : null}
      {faceAuthPhase === 'SEND_OR_RETAKE' && faceAuthPicture ? (
        <SendOrRetakeStep
          picture={faceAuthPicture}
          onPictureSent={onPictureSent}
          onRetakePicture={onRetakePicture}
        />
      ) : null}
      {faceAuthPhase === 'SENT' && faceAuthPicture ? (
        <PictureSentStep
          picture={faceAuthPicture}
          onRetakePicture={onRetakePicture}
          onFaceAuthSuccess={updateKycStepPassed}
        />
      ) : null}
    </View>
  );
}
