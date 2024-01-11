// SPDX-License-Identifier: ice License 1.0

import {
  isAuthorizedSelector,
  isRegistrationCompleteSelector,
} from '@store/modules/Account/selectors';
import {successfullyLinked} from '@store/modules/Account/utils/successfullyLinked';
import {waitForSelector} from '@store/utils/sagas/effects';
import {call, delay} from 'redux-saga/effects';

/**
 * Show successfully linked popup after phone number
 * to email migration
 */
export function* successfullyLinkedSaga() {
  yield call(waitForSelector, isRegistrationCompleteSelector);
  yield call(waitForSelector, isAuthorizedSelector);
  /*
   * wait few secs before showing
   * */
  yield delay(2000);
  yield call(successfullyLinked);
}
