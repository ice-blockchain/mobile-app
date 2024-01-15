// SPDX-License-Identifier: ice License 1.0

import {Attributes, trackEvent} from '@services/analytics';
import {getAuthProvider} from '@services/auth';
import {
  authTokenSelector,
  isRegistrationCompleteSelector,
} from '@store/modules/Account/selectors';
import {AnalyticsActions} from '@store/modules/Analytics/actions';
import {EVENT_NAMES} from '@store/modules/Analytics/constants';
import {referredBySelector} from '@store/modules/Analytics/selectors';
import {waitForSelector} from '@store/utils/sagas/effects';
import {call, put, select} from 'redux-saga/effects';

type Actions = ReturnType<typeof AnalyticsActions.TRACK_SIGN_UP.START.create>;

export function* trackSignUpSaga(action: Actions) {
  yield call(waitForSelector, isRegistrationCompleteSelector);

  const {user} = action.payload;
  const authProvider: string | null = yield call(getAuthProvider);
  const token: ReturnType<typeof authTokenSelector> = yield select(
    authTokenSelector,
  );
  const signInType = token?.issuer === 'custom' ? 'customAuth' : authProvider;
  const referredBy: ReturnType<typeof referredBySelector> = yield select(
    referredBySelector,
  );
  yield call(trackEvent, {
    eventName: EVENT_NAMES.REGISTER,
    eventProps: {
      Method: signInType ?? '',
      Email: user?.email ?? '',
      Referral: referredBy ?? '',
    },
  });
  yield call(
    Attributes.trackUserAttribute,
    'Register Method',
    signInType ?? '',
  );

  yield put(AnalyticsActions.TRACK_SIGN_UP.SUCCESS.create());
}
