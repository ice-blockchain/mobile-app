// SPDX-License-Identifier: ice License 1.0

import {COLORS} from '@constants/colors';
import {Header} from '@navigation/components/Header';
import {useFocusStatusBar} from '@navigation/hooks/useFocusStatusBar';
import {FaceAuthCameraFeed} from '@screens/FaceAuthFlow/FaceAuthCameraFeed';
import {FaceAuthUserConsent} from '@screens/FaceAuthFlow/FaceAuthUserConsent';
import {unsafeUserSelector} from '@store/modules/Account/selectors';
import {t} from '@translations/i18n';
import React, {useState} from 'react';
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
  const user = useSelector(unsafeUserSelector);
  const [kycStepPassed, setKycStepPassed] = useState(user.kycStepPassed);
  const updateKycStepPassed = () => {
    setKycStepPassed(1);
  };

  return (
    <View style={styles.container}>
      <Header
        color={COLORS.primaryDark}
        title={t('face_auth.header')}
        backgroundColor={'transparent'}
      />
      {renderContent({kycStepPassed, updateKycStepPassed})}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
});
