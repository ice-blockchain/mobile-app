// SPDX-License-Identifier: ice License 1.0

import {FaceAuthKycNumber} from '@api/tokenomics/types';
import {COLORS} from '@constants/colors';
import {commonStyles} from '@constants/styles';
import {AuthStackParamList} from '@navigation/Auth';
import {Header} from '@navigation/components/Header';
import {useFocusStatusBar} from '@navigation/hooks/useFocusStatusBar';
import {MainStackParamList} from '@navigation/Main';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {StatusOverlay} from '@screens/FaceRecognitionFlow/components/StatusOverlay';
import {EmotionsAuthCameraFeed} from '@screens/FaceRecognitionFlow/EmotionsAuthCameraFeed';
import {FaceAuthCameraFeed} from '@screens/FaceRecognitionFlow/FaceAuthCameraFeed';
import {FaceAuthUserConsent} from '@screens/FaceRecognitionFlow/FaceAuthUserConsent';
import {
  emotionsAuthStatusSelector,
  faceAuthStatusSelector,
} from '@store/modules/FaceRecognition/selectors';
import {t} from '@translations/i18n';
import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {useSelector} from 'react-redux';

type FaceRecognitionPhase = 'USER_CONSENT' | 'FACE_AUTH' | 'EMOTIONS_AUTH';

function kycStepToFaceRecognitionPhase(kycStepPassed: FaceAuthKycNumber) {
  switch (kycStepPassed) {
    case 1:
      return 'USER_CONSENT';
    default:
      return 'EMOTIONS_AUTH';
  }
}

export function FaceRecognition() {
  const {
    params: {kycSteps, kycStepBlocked, isPhoneMigrationFlow = false},
  } =
    useRoute<
      RouteProp<MainStackParamList | AuthStackParamList, 'FaceRecognition'>
    >();
  useFocusStatusBar({style: 'dark-content'});
  const navigation = useNavigation();
  const faceAuthStatus = useSelector(faceAuthStatusSelector);
  const emotionsAuthStatus = useSelector(emotionsAuthStatusSelector);

  const isBanned =
    faceAuthStatus === 'BANNED' ||
    emotionsAuthStatus === 'BANNED' ||
    !!kycStepBlocked;

  const [faceRecognitionPhase, setFaceRecognitionPhase] =
    useState<FaceRecognitionPhase>(() =>
      kycStepToFaceRecognitionPhase(kycSteps[0]),
    );

  const onFaceAuthSuccess = () => {
    setFaceRecognitionPhase('EMOTIONS_AUTH');
  };

  return (
    <View style={styles.container}>
      {isBanned ? (
        <View style={commonStyles.flexOne}>
          <Header
            color={COLORS.primaryDark}
            title={
              isPhoneMigrationFlow
                ? t('account_confirmation.title')
                : t('face_auth.header')
            }
            backgroundColor={'transparent'}
          />
          <StatusOverlay
            onLightBackground
            description={t('face_auth.auth_status.banned.description')}
            title={t('face_auth.auth_status.banned.title')}
            actionText={t('face_auth.auth_status.banned.action')}
            actionColor={COLORS.attention}
            action={navigation.goBack}
          />
        </View>
      ) : (
        <>
          {faceRecognitionPhase === 'USER_CONSENT' ? (
            <FaceAuthUserConsent
              updateKycStepPassed={() => setFaceRecognitionPhase('FACE_AUTH')}
            />
          ) : null}
          {faceRecognitionPhase === 'FACE_AUTH' ? (
            <FaceAuthCameraFeed
              onFaceAuthSuccess={onFaceAuthSuccess}
              kycSteps={kycSteps}
            />
          ) : null}
          {faceRecognitionPhase === 'EMOTIONS_AUTH' ? (
            <EmotionsAuthCameraFeed
              isPhoneMigrationFlow={isPhoneMigrationFlow}
            />
          ) : null}
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
});
