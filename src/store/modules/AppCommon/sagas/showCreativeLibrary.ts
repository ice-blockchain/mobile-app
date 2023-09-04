// SPDX-License-Identifier: ice License 1.0

import {navigate} from '@navigation/utils';
import {
  isAuthorizedSelector,
  isRegistrationCompleteSelector,
} from '@store/modules/Account/selectors';
import {AppCommonActions} from '@store/modules/AppCommon/actions';
import {
  firstSignInTimeSelector,
  isAppActiveSelector,
  showedCreativeLibrarySelector,
} from '@store/modules/AppCommon/selectors';
import {waitForSelector} from '@store/utils/sagas/effects';
import {call, put, select} from 'redux-saga/effects';

export function* showCreativeLibrarySaga() {
  const isAuthorized: ReturnType<typeof isAuthorizedSelector> = yield select(
    isAuthorizedSelector,
  );

  const isAppActive: ReturnType<typeof isAuthorizedSelector> = yield select(
    isAppActiveSelector,
  );

  const firstSignInTime: ReturnType<typeof firstSignInTimeSelector> =
    yield select(firstSignInTimeSelector);

  const showedCreativeLibrary: ReturnType<
    typeof showedCreativeLibrarySelector
  > = yield select(showedCreativeLibrarySelector);
  if (isAuthorized && isAppActive) {
    yield call(waitForSelector, isRegistrationCompleteSelector);
    if (!firstSignInTime) {
      yield put(AppCommonActions.SET_FIRST_SIGN_IN_TIME.STATE.create());
    } else if (
      !showedCreativeLibrary &&
      // if passed at least 1h
      Date.now() - firstSignInTime >= 1000 * 60 * 60
    ) {
      navigate({name: 'CreativeIceLibrary', params: undefined});
      yield put(AppCommonActions.SET_SHOWED_CREATIVE_LIBRARY.STATE.create());
    }
  }
}
