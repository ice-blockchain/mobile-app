// SPDX-License-Identifier: ice License 1.0

import {commonStyles} from '@constants/styles';
import {PictureSentStep} from '@screens/FaceAuthFlow/FaceAuthCameraFeed/components/PictureSentStep';
import {SendOrRetakeStep} from '@screens/FaceAuthFlow/FaceAuthCameraFeed/components/SendOrRetakeStep';
import {TakeSelfieStep} from '@screens/FaceAuthFlow/FaceAuthCameraFeed/components/TakeSelfieStep';
import {CameraCapturedPicture} from 'expo-camera';
import React, {useState} from 'react';
import {View} from 'react-native';

type FaceAuthPhase = 'TAKE_SELFIE' | 'SEND_OR_RETAKE' | 'SENT';

export function FaceAuthCameraFeed() {
  const [faceAuthPhase, setFaceAuthPhase] =
    useState<FaceAuthPhase>('TAKE_SELFIE');

  const [faceAuthPicture, setFaceAuthPicture] =
    useState<CameraCapturedPicture | null>(null);
  const onPictureTaken = async (picture: CameraCapturedPicture) => {
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
        />
      ) : null}
    </View>
  );
}
