// SPDX-License-Identifier: ice License 1.0

import {navigate} from '@navigation/utils';
import {
  isAuthorizedSelector,
  isRegistrationCompleteSelector,
  unsafeUserSelector,
} from '@store/modules/Account/selectors';
import {openSetEmail} from '@store/modules/Account/utils/openSetEmail';
import {
  isAppActiveSelector,
  isSplashHiddenSelector,
} from '@store/modules/AppCommon/selectors';
import {waitForSelector} from '@store/utils/sagas/effects';
import {call, delay, SagaReturnType, select} from 'redux-saga/effects';

export function* forcedSetEmailSaga() {
  const isAuthorized: ReturnType<typeof isAuthorizedSelector> = yield select(
    isAuthorizedSelector,
  );

  const isAppActive: ReturnType<typeof isAuthorizedSelector> = yield select(
    isAppActiveSelector,
  );

  if (isAuthorized && isAppActive) {
    yield call(waitForSelector, isRegistrationCompleteSelector);
    yield call(waitForSelector, isSplashHiddenSelector);
    const user: SagaReturnType<typeof unsafeUserSelector> = yield select(
      unsafeUserSelector,
    );
    if (!user.email) {
      // Postpone navigation to set-email popup in queue to let the MainNavigator render.
      // Handles the case when MainNavigator also starts to render on isRegistrationComplete (after the Welcome flow).
      yield delay(0);
      yield call(openSetEmail);
      yield call(navigate, {name: 'ForcedSetEmail', params: undefined});
    }
  }
}
