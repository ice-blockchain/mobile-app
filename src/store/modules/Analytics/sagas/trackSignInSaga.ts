// SPDX-License-Identifier: ice License 1.0

import {trackEvent} from '@services/analytics';
import {getAuthProvider} from '@services/auth';
import {authTokenSelector} from '@store/modules/Account/selectors';
import {AnalyticsActions} from '@store/modules/Analytics/actions';
import {EVENT_NAMES} from '@store/modules/Analytics/constants';
import {authTrackedSelector} from '@store/modules/Analytics/selectors';
import {call, put, select} from 'redux-saga/effects';

type Actions = ReturnType<typeof AnalyticsActions.TRACK_SIGN_IN.START.create>;

export function* trackSignInSaga(action: Actions) {
  const {user} = action.payload;

  const authProvider: string | null = yield call(getAuthProvider);
  const token: ReturnType<typeof authTokenSelector> = yield select(
    authTokenSelector,
  );
  const signInType = token?.issuer === 'custom' ? 'customAuth' : authProvider;
  const authTracked: ReturnType<typeof authTrackedSelector> = yield select(
    authTrackedSelector,
  );
  if (user && signInType && !authTracked) {
    yield call(trackEvent, {
      eventName: EVENT_NAMES.LOGIN,
      eventProps: {
        Method: signInType,
        Email: user?.email ?? '',
      },
    });

    yield put(AnalyticsActions.TRACK_SIGN_IN.SUCCESS.create());
  }
}
