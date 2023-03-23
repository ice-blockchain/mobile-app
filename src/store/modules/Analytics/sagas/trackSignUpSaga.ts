// SPDX-License-Identifier: ice License 1.0

import {Attributes, trackEvent} from '@services/analytics';
import {getAuthProvider} from '@services/auth';
import {AnalyticsActions} from '@store/modules/Analytics/actions';
import {EVENT_NAMES} from '@store/modules/Analytics/constants';
import {referredBySelector} from '@store/modules/Analytics/selectors';
import {call, select} from 'redux-saga/effects';

type Actions = ReturnType<typeof AnalyticsActions.TRACK_SIGN_UP.START.create>;

export function* trackSignUpSaga(action: Actions) {
  const {user} = action.payload;
  const signInType: string | null = yield call(getAuthProvider);
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
}
