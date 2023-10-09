// SPDX-License-Identifier: ice License 1.0

import {COLORS} from '@constants/colors';
import {commonStyles} from '@constants/styles';
import {Header} from '@navigation/components/Header';
import {CountrySelect} from '@screens/FaceRecognitionFlow/FaceAuthUserConsent/CountrySelect';
import {UserConsent} from '@screens/FaceRecognitionFlow/FaceAuthUserConsent/UserConsent';
import {t} from '@translations/i18n';
import React, {useState} from 'react';
import {View} from 'react-native';

type Props = {
  updateKycStepPassed: () => void;
};

export function FaceAuthUserConsent({updateKycStepPassed}: Props) {
  const [consentPassed, setConsentPassed] = useState(false);

  return (
    <View style={commonStyles.flexOne}>
      <Header
        color={COLORS.primaryDark}
        title={t('face_auth.header')}
        backgroundColor={'transparent'}
      />
      {consentPassed ? (
        <CountrySelect onContinue={updateKycStepPassed} />
      ) : (
        <UserConsent
          updateKycStepPassed={() => {
            setConsentPassed(true);
          }}
        />
      )}
    </View>
  );
}
