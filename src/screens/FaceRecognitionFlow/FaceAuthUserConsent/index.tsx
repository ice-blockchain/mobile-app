// SPDX-License-Identifier: ice License 1.0

import {COLORS} from '@constants/colors';
import {commonStyles} from '@constants/styles';
import {Header} from '@navigation/components/Header';
import {CountrySelect} from '@screens/FaceRecognitionFlow/FaceAuthUserConsent/CountrySelect';
import {SelfieGuidelines} from '@screens/FaceRecognitionFlow/FaceAuthUserConsent/SelfieGuidelines';
import {UserConsent} from '@screens/FaceRecognitionFlow/FaceAuthUserConsent/UserConsent';
import {t} from '@translations/i18n';
import React, {useState} from 'react';
import {View} from 'react-native';

type Props = {
  updateKycStepPassed: () => void;
};

type Step = 'consent' | 'country' | 'guidelines';

export function FaceAuthUserConsent({updateKycStepPassed}: Props) {
  const [currentStep, setCurrentStep] = useState<Step>('consent');

  return (
    <View style={commonStyles.flexOne}>
      <Header
        color={COLORS.primaryDark}
        title={t('face_auth.header')}
        backgroundColor={'transparent'}
      />
      {currentStep === 'consent' && (
        <UserConsent onStepComplete={() => setCurrentStep('country')} />
      )}
      {currentStep === 'country' && (
        <CountrySelect onStepComplete={() => setCurrentStep('guidelines')} />
      )}
      {currentStep === 'guidelines' && (
        <SelfieGuidelines onStepComplete={updateKycStepPassed} />
      )}
    </View>
  );
}
