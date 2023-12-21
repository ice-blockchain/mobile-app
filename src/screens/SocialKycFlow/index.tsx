// SPDX-License-Identifier: ice License 1.0

import {SocialKycStepNumber} from '@api/tokenomics/types';
import {COLORS} from '@constants/colors';
import {useFocusStatusBar} from '@navigation/hooks/useFocusStatusBar';
import {MainStackParamList} from '@navigation/Main';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {InstructionsStep} from '@screens/SocialKycFlow/InstructionsStep';
import {ResultStep} from '@screens/SocialKycFlow/ResultStep';
import {SelectProfileStep} from '@screens/SocialKycFlow/SelectProfileStep';
import {VerificationStep} from '@screens/SocialKycFlow/VerificationStep';
import {SocialKycActions} from '@store/modules/SocialKyc/actions';
import {SocialKycMethod} from '@store/modules/SocialKyc/types';
import {TokenomicsActions} from '@store/modules/Tokenomics/actions';
import React, {useCallback, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {useDispatch} from 'react-redux';

type SocialKycFlowPhase =
  | 'SELECT_PROFILE_TYPE'
  | 'INSTRUCTIONS'
  | 'VERIFICATION'
  | 'RESULT';

export function SocialKycFlow() {
  const {
    params: {kycStep},
  } = useRoute<RouteProp<MainStackParamList, 'SocialKycFlow'>>();
  useFocusStatusBar({style: 'dark-content'});
  const [socialKycFlowPhase, setSocialKycFlowPhase] =
    useState<SocialKycFlowPhase>('SELECT_PROFILE_TYPE');

  const [socialKycMethod] = useState<SocialKycMethod | null>('X');

  const dispatch = useDispatch();
  const navigation = useNavigation();
  const onSkip = useCallback(
    (skipKYCStep?: SocialKycStepNumber) => {
      dispatch(
        TokenomicsActions.START_MINING_SESSION.START.create({
          skipKYCStep,
        }),
      );
      navigation.goBack();
      dispatch(SocialKycActions.RESET_SOCIAL_KYC_STATUS.STATE.create());
    },
    [dispatch, navigation],
  );

  const onSelectProfileStepPassed = useCallback(
    () => setSocialKycFlowPhase('INSTRUCTIONS'),
    [],
  );
  const onInstructionsStepPassed = useCallback(() => {
    if (socialKycMethod === 'Facebook') {
      setSocialKycFlowPhase('RESULT');
    } else {
      setSocialKycFlowPhase('VERIFICATION');
    }
  }, [socialKycMethod]);
  const onInstructionsStepGoBack = useCallback(() => {
    dispatch(SocialKycActions.RESET_SOCIAL_KYC_STATUS.STATE.create());
    setSocialKycFlowPhase('SELECT_PROFILE_TYPE');
  }, [dispatch]);
  const onVerificationStepPassed = useCallback(
    () => setSocialKycFlowPhase('RESULT'),
    [],
  );
  const onVerificationStepGoBack = useCallback(() => {
    dispatch(SocialKycActions.RESET_SOCIAL_KYC_STATUS.STATE.create());
    setSocialKycFlowPhase('INSTRUCTIONS');
  }, [dispatch]);
  const onTryAgain = useCallback(() => {
    setSocialKycFlowPhase('SELECT_PROFILE_TYPE');
    dispatch(SocialKycActions.RESET_SOCIAL_KYC_STATUS.STATE.create());
  }, [dispatch]);

  return (
    <View style={styles.container}>
      {socialKycFlowPhase === 'SELECT_PROFILE_TYPE' ? (
        <SelectProfileStep
          kycStep={kycStep}
          onGoBack={() =>
            dispatch(SocialKycActions.RESET_SOCIAL_KYC_STATUS.STATE.create())
          }
          onSkip={onSkip}
          socialKycMethod={socialKycMethod}
          updateStepPassed={onSelectProfileStepPassed}
        />
      ) : null}
      {socialKycFlowPhase === 'INSTRUCTIONS' ? (
        <InstructionsStep
          kycStep={kycStep}
          onGoBack={onInstructionsStepGoBack}
          onSkip={onSkip}
          socialKycMethod={socialKycMethod ?? 'X'}
          updateStepPassed={onInstructionsStepPassed}
        />
      ) : null}
      {socialKycFlowPhase === 'VERIFICATION' ? (
        <VerificationStep
          kycStep={kycStep}
          onGoBack={onVerificationStepGoBack}
          onSkip={onSkip}
          socialKycMethod={socialKycMethod ?? 'X'}
          updateStepPassed={onVerificationStepPassed}
        />
      ) : null}
      {socialKycFlowPhase === 'RESULT' ? (
        <ResultStep onSkip={onSkip} onTryAgain={onTryAgain} kycStep={kycStep} />
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
});
