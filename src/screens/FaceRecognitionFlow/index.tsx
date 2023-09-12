// SPDX-License-Identifier: ice License 1.0

import {COLORS} from '@constants/colors';
import {commonStyles} from '@constants/styles';
import {Header} from '@navigation/components/Header';
import {useFocusStatusBar} from '@navigation/hooks/useFocusStatusBar';
import {useNavigation} from '@react-navigation/native';
import {StatusOverlay} from '@screens/FaceRecognitionFlow/components/StatusOverlay';
import {EmotionsAuthCameraFeed} from '@screens/FaceRecognitionFlow/EmotionsAuthCameraFeed';
import {FaceAuthCameraFeed} from '@screens/FaceRecognitionFlow/FaceAuthCameraFeed';
import {FaceAuthUserConsent} from '@screens/FaceRecognitionFlow/FaceAuthUserConsent';
import {unsafeUserSelector} from '@store/modules/Account/selectors';
import {faceAuthStatusSelector} from '@store/modules/FaceRecognition/selectors';
import {t} from '@translations/i18n';
import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {useSelector} from 'react-redux';

function renderContent({
  kycStepPassed,
  setKycStepPassed,
}: {
  kycStepPassed?: number;
  setKycStepPassed: (step: number) => void;
}) {
  switch (kycStepPassed) {
    case 1: {
      return (
        <FaceAuthCameraFeed updateKycStepPassed={() => setKycStepPassed(2)} />
      );
    }
    case 2: {
      return <EmotionsAuthCameraFeed />;
    }
    default: {
      return (
        <FaceAuthUserConsent updateKycStepPassed={() => setKycStepPassed(1)} />
      );
    }
  }
}

export function FaceRecognition() {
  useFocusStatusBar({style: 'dark-content'});
  const navigation = useNavigation();
  const user = useSelector(unsafeUserSelector);
  const faceAuthStatus = useSelector(faceAuthStatusSelector);
  const isBanned =
    faceAuthStatus === 'BANNED' || (user.kycStepBlocked && !user.kycStepPassed);
  const [kycStepPassed, setKycStepPassed] = useState(user.kycStepPassed);

  useEffect(() => {
    if (kycStepPassed === 2) {
      if (
        (user?.repeatableKycSteps?.[0] ?? Number.MAX_SAFE_INTEGER) < Date.now()
      ) {
        setKycStepPassed(0);
      } else if (
        (user?.repeatableKycSteps?.[1] ?? Number.MAX_SAFE_INTEGER) < Date.now()
      ) {
        setKycStepPassed(1);
      }
    }
  }, [kycStepPassed, user?.repeatableKycSteps]);

  return (
    <View style={styles.container}>
      <Header
        color={COLORS.primaryDark}
        title={t('face_auth.header')}
        backgroundColor={'transparent'}
      />
      {isBanned ? (
        <View style={commonStyles.flexOne}>
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
        renderContent({kycStepPassed, setKycStepPassed})
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
