// SPDX-License-Identifier: ice License 1.0

import {navigate} from '@navigation/utils';
import {
  isAuthorizedSelector,
  isRegistrationCompleteSelector,
  unsafeUserSelector,
} from '@store/modules/Account/selectors';
import {openSetEmail} from '@store/modules/Account/utils/openSetEmail';
import {isAppActiveSelector} from '@store/modules/AppCommon/selectors';
import {waitForSelector} from '@store/utils/sagas/effects';
import {call, SagaReturnType, select} from 'redux-saga/effects';

export function* forcedSetEmailSaga() {
  const isAuthorized: ReturnType<typeof isAuthorizedSelector> = yield select(
    isAuthorizedSelector,
  );

  const isAppActive: ReturnType<typeof isAuthorizedSelector> = yield select(
    isAppActiveSelector,
  );

  if (isAuthorized && isAppActive) {
    yield call(waitForSelector, isRegistrationCompleteSelector);
    const user: SagaReturnType<typeof unsafeUserSelector> = yield select(
      unsafeUserSelector,
    );
    if (true || !user.email) {
      yield call(openSetEmail);
      yield call(navigate, {name: 'ForcedSetEmail', params: undefined});
    }
  }
}
