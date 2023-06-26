// SPDX-License-Identifier: ice License 1.0

import {showWalkthroughSaga} from '@store/modules/Walkthrough/sagas/showWalkthroughSaga';
import {fork} from 'redux-saga/effects';

export const walkthroughWatchers = [fork(showWalkthroughSaga)];
