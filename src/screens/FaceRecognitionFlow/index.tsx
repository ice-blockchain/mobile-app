// SPDX-License-Identifier: ice License 1.0

import {FaceAuthKycNumber} from '@api/tokenomics/types';
import {COLORS} from '@constants/colors';
import {commonStyles} from '@constants/styles';
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

function renderContent({
  faceRecognitionPhase,
  setFaceRecognitionPhase,
  kycStep,
}: {
  faceRecognitionPhase: FaceRecognitionPhase;
  setFaceRecognitionPhase: (phase: FaceRecognitionPhase) => void;
  kycStep: FaceAuthKycNumber;
}) {
  switch (faceRecognitionPhase) {
    case 'USER_CONSENT': {
      return (
        <FaceAuthUserConsent
          updateKycStepPassed={() => setFaceRecognitionPhase('FACE_AUTH')}
        />
      );
    }
    case 'FACE_AUTH': {
      return (
        <FaceAuthCameraFeed
          updateKycStepPassed={() => setFaceRecognitionPhase('EMOTIONS_AUTH')}
        />
      );
    }
    case 'EMOTIONS_AUTH': {
      return <EmotionsAuthCameraFeed kycStep={kycStep} />;
    }
  }
}

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
    params: {kycStep, kycStepBlocked},
  } = useRoute<RouteProp<MainStackParamList, 'FaceRecognition'>>();
  useFocusStatusBar({style: 'dark-content'});
  const navigation = useNavigation();
  const faceAuthStatus = useSelector(faceAuthStatusSelector);
  const emotionsAuthStatus = useSelector(emotionsAuthStatusSelector);

  const isBanned =
    faceAuthStatus === 'BANNED' ||
    emotionsAuthStatus === 'BANNED' ||
    kycStepBlocked;

  const [faceRecognitionPhase, setFaceRecognitionPhase] =
    useState<FaceRecognitionPhase>(() =>
      kycStepToFaceRecognitionPhase(kycStep),
    );

  return (
    <View style={styles.container}>
      {isBanned ? (
        <View style={commonStyles.flexOne}>
          <Header
            color={COLORS.primaryDark}
            title={t('face_auth.header')}
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
        renderContent({faceRecognitionPhase, setFaceRecognitionPhase, kycStep})
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
