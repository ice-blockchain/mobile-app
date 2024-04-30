// SPDX-License-Identifier: ice License 1.0

import {EMOTIONS_KYC_STEP} from '@api/tokenomics/constants';
import {FaceAuthKycNumber} from '@api/tokenomics/types';
import {COLORS} from '@constants/colors';
import {commonStyles} from '@constants/styles';
import {useOnHardwareBack} from '@hooks/useOnHardwareBack';
import {Header} from '@navigation/components/Header';
import {useNavigation} from '@react-navigation/native';
import {PictureSentStep} from '@screens/FaceRecognitionFlow/FaceAuthCameraFeed/components/PictureSentStep';
import {SendOrRetakeStep} from '@screens/FaceRecognitionFlow/FaceAuthCameraFeed/components/SendOrRetakeStep';
import {TakeSelfieStep} from '@screens/FaceRecognitionFlow/FaceAuthCameraFeed/components/TakeSelfieStep';
import {FaceRecognitionActions} from '@store/modules/FaceRecognition/actions';
import {faceAuthStatusSelector} from '@store/modules/FaceRecognition/selectors';
import {TokenomicsActions} from '@store/modules/Tokenomics/actions';
import {t} from '@translations/i18n';
import {CameraCapturedPicture} from 'expo-camera';
import React, {useCallback, useState} from 'react';
import {View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

type FaceAuthPhase = 'TAKE_SELFIE' | 'SEND_OR_RETAKE' | 'SENT';

type Props = {
  onFaceAuthSuccess: () => void;
  kycSteps: FaceAuthKycNumber[];
};

export function FaceAuthCameraFeed({onFaceAuthSuccess, kycSteps}: Props) {
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

  const faceAuthStatus = useSelector(faceAuthStatusSelector);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const startMiningOnSuccess =
    !kycSteps?.includes(EMOTIONS_KYC_STEP) ||
    faceAuthStatus === 'SUCCESS_BUT_SKIP_EMOTIONS';
  const onGoBack = useCallback(() => {
    if (
      faceAuthStatus === 'SUCCESS' ||
      faceAuthStatus === 'SUCCESS_BUT_SKIP_EMOTIONS'
    ) {
      dispatch(TokenomicsActions.START_MINING_SESSION.START.create());
    }
    if (faceAuthStatus !== 'BANNED') {
      dispatch(FaceRecognitionActions.RESET_FACE_AUTH_STATUS.STATE.create());
    }
  }, [dispatch, faceAuthStatus]);

  useOnHardwareBack({callback: onGoBack});

  return (
    <View style={commonStyles.flexOne}>
      <Header
        color={COLORS.primaryDark}
        title={t('face_auth.header')}
        backgroundColor={'transparent'}
        onGoBack={onGoBack}
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
          onFaceAuthSuccess={() => {
            if (startMiningOnSuccess) {
              dispatch(TokenomicsActions.START_MINING_SESSION.START.create());
              navigation.goBack();
            } else {
              onFaceAuthSuccess();
            }
          }}
        />
      ) : null}
    </View>
  );
}
