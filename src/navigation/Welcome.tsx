// SPDX-License-Identifier: ice License 1.0

import {isLightDesign} from '@constants/featureFlags';
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
import {store} from '@store/configureStore';
import {userSelector} from '@store/modules/Account/selectors';
import {isOnboardingViewedSelector} from '@store/modules/Users/selectors';
// import {emailVerificationStepSelector} from '@store/modules/Validation/selectors'; //TODO: temp email step disabling
import React, {useRef} from 'react';

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

export const WELCOME_STEPS: {
  name: keyof Pick<
    WelcomeStackParamList,
    'Onboarding' | 'ClaimUsername' | 'WhoInvitedYou' | 'SetEmail' | 'IceBonus'
  >;
  finished: () => boolean;
}[] = [
  {
    name: 'Onboarding',
    finished: () => {
      const user = userSelector(store.getState());
      return isOnboardingViewedSelector(user?.id)(store.getState());
    },
  },
  {
    name: 'ClaimUsername',
    finished: () => {
      return !!userSelector(store.getState())?.username;
    },
  },
  {
    name: 'WhoInvitedYou',
    finished: () => {
      return !!userSelector(store.getState())?.referredBy;
    },
  },
  //TODO: temp email step disabling
  // {
  //   name: 'SetEmail',
  //   finished: () => {
  //     return !!userSelector(store.getState())?.email;
  //   },
  // },
  {
    name: 'IceBonus',
    finished: () => {
      if (isLightDesign) {
        return true;
      }
      return !!userSelector(
        store.getState(),
      )?.clientData?.registrationProcessFinalizedSteps?.includes('iceBonus');
    },
  },
];

export function WelcomeNavigator() {
  const initializedRef = useRef(false);

  /**
   * Setting initial navigation state to add an ability to go back
   */
  let initialRouteName;
  if (!initializedRef.current) {
    const stepNames = WELCOME_STEPS.map(s => s.name);
    const currentStepIndex = WELCOME_STEPS.findIndex(step => !step.finished());
    initialRouteName = stepNames[currentStepIndex];
    resetRoot({
      index: currentStepIndex,
      routes: stepNames.slice(0, currentStepIndex + 1).map(name => ({name})),
    });
    initializedRef.current = true;
  }

  return (
    <WelcomeStack.Navigator
      screenOptions={screenOptions}
      initialRouteName={initialRouteName}>
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
