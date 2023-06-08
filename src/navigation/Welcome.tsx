// SPDX-License-Identifier: ice License 1.0

import {modalOptions, screenOptions} from '@navigation/options';
import {resetRoot} from '@navigation/utils';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {ConfirmEmailLink} from '@screens/AuthFlow/ConfirmEmailLink';
import {PopUp, PopUpProps} from '@screens/Modals/PopUp';
import {
  QRCodeScanner,
  QRCodeScannerParams,
} from '@screens/Modals/QRCodeScanner';
import {ClaimUsername} from '@screens/WelcomeFlow/ClaimUsername';
import {IceBonus} from '@screens/WelcomeFlow/IceBonus';
import {Onboarding} from '@screens/WelcomeFlow/Onboarding';
import {SetEmail} from '@screens/WelcomeFlow/SetEmail';
import {WhoInvitedYou} from '@screens/WelcomeFlow/WhoInvitedYou';
import {unsafeUserSelector} from '@store/modules/Account/selectors';
import {isOnboardingViewedSelector} from '@store/modules/Users/selectors';
// import {emailVerificationStepSelector} from '@store/modules/Validation/selectors'; //TODO: temp email step disabling
import React, {useMemo, useRef} from 'react';
import {useSelector} from 'react-redux';

export type WelcomeStackParamList = {
  ClaimUsername: undefined;
  WhoInvitedYou: undefined;
  SetEmail: undefined;
  ConfirmEmailLink: undefined;
  IceBonus: undefined;
  Onboarding: undefined;
  ErrorPopUp: {message: string};
  PopUp: PopUpProps;
  QRCodeScanner: QRCodeScannerParams;
};

const WelcomeStack = createNativeStackNavigator<WelcomeStackParamList>();

const STEPS: (keyof WelcomeStackParamList)[] = [
  'Onboarding',
  'ClaimUsername',
  'WhoInvitedYou',
  // 'SetEmail', //TODO: temp email step disabling
  'IceBonus',
];

export function WelcomeNavigator() {
  const initializedRef = useRef(false);
  const user: ReturnType<typeof unsafeUserSelector> =
    useSelector(unsafeUserSelector);
  const isOnboardingViewed = useSelector(isOnboardingViewedSelector(user.id));

  // const emailVerificationStep = useSelector(emailVerificationStepSelector); //TODO: temp email step disabling

  const welcomeRoute = useMemo(() => {
    if (!isOnboardingViewed) {
      return 'Onboarding';
    } else if (!user.username) {
      return 'ClaimUsername';
    } else if (!user.referredBy) {
      return 'WhoInvitedYou';
    }
    //TODO: temp email step disabling
    // else if (!user.email) {
    //   return emailVerificationStep === 'email'
    //     ? 'SetEmail'
    //     : 'ConfirmEmailLink';
    // }
    else {
      return 'IceBonus';
    }
  }, [user, isOnboardingViewed]);

  /**
   * Setting initial navigation state to add an ability to go back
   */
  if (!initializedRef.current) {
    const stepIndex = STEPS.indexOf(welcomeRoute);
    resetRoot({
      index: stepIndex,
      routes: STEPS.slice(0, stepIndex + 1).map(name => ({name})),
    });
    initializedRef.current = true;
  }

  return (
    <WelcomeStack.Navigator screenOptions={screenOptions}>
      <WelcomeStack.Screen name="ClaimUsername" component={ClaimUsername} />
      <WelcomeStack.Screen name="WhoInvitedYou" component={WhoInvitedYou} />
      <WelcomeStack.Screen name="SetEmail" component={SetEmail} />
      <WelcomeStack.Screen
        name="ConfirmEmailLink"
        component={ConfirmEmailLink}
      />
      <WelcomeStack.Screen name="IceBonus" component={IceBonus} />
      <WelcomeStack.Screen name="Onboarding" component={Onboarding} />
      <WelcomeStack.Screen
        name="PopUp"
        options={modalOptions}
        component={PopUp}
      />
      <WelcomeStack.Screen
        name="QRCodeScanner"
        component={QRCodeScanner}
        options={modalOptions}
      />
    </WelcomeStack.Navigator>
  );
}
