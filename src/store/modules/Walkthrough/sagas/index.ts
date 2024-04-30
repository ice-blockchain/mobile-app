// SPDX-License-Identifier: ice License 1.0

import {isLightDesign} from '@constants/featureFlags';
import {showWalkthroughSaga} from '@store/modules/Walkthrough/sagas/showWalkthroughSaga';
import {fork} from 'redux-saga/effects';

export const walkthroughWatchers = isLightDesign
  ? []
  : [fork(showWalkthroughSaga)];
