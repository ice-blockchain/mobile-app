// SPDX-License-Identifier: ice License 1.0

import {COLORS} from '@constants/colors';
import {commonStyles} from '@constants/styles';
import {Header} from '@navigation/components/Header';
import {useFocusStatusBar} from '@navigation/hooks/useFocusStatusBar';
import {useNavigation} from '@react-navigation/native';
import {FaceAuthCameraFeed} from '@screens/FaceAuthFlow/FaceAuthCameraFeed';
import {StatusOverlay} from '@screens/FaceAuthFlow/FaceAuthCameraFeed/components/StatusOverlay';
import {FaceAuthUserConsent} from '@screens/FaceAuthFlow/FaceAuthUserConsent';
import {unsafeUserSelector} from '@store/modules/Account/selectors';
import {faceAuthStatusSelector} from '@store/modules/FaceAuth/selectors';
import {t} from '@translations/i18n';
import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {useSelector} from 'react-redux';

function renderContent({
  kycStepPassed,
  updateKycStepPassed,
}: {
  kycStepPassed?: number;
  updateKycStepPassed: () => void;
}) {
  switch (kycStepPassed) {
    case 1: {
      return <FaceAuthCameraFeed />;
    }
    default: {
      return <FaceAuthUserConsent updateKycStepPassed={updateKycStepPassed} />;
    }
  }
}

export function FaceAuth() {
  useFocusStatusBar({style: 'dark-content'});
  const navigation = useNavigation();
  const user = useSelector(unsafeUserSelector);
  const faceAuthStatus = useSelector(faceAuthStatusSelector);
  const isBanned =
    faceAuthStatus === 'BANNED' || (user.kycStepBlocked && !user.kycStepPassed);
  const [kycStepPassed, setKycStepPassed] = useState(user.kycStepPassed);
  const updateKycStepPassed = () => {
    setKycStepPassed(1);
  };

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
        renderContent({kycStepPassed, updateKycStepPassed})
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
