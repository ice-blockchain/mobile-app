// SPDX-License-Identifier: BUSL-1.1

import {AppState} from 'react-native';
// import env from 'src/constants/env';

export const isAppActive = () => AppState.currentState === 'active';

// export const isDevEnv = () => env.ENV === 'DEV';

// export const isDebug = () => !!global.__DEV__;

export const biggerTapArea = {
  top: 15,
  left: 15,
  right: 15,
  bottom: 15,
};

export const monkeyPressDelay = 3000;
