// SPDX-License-Identifier: ice License 1.0

import {Api} from '@api/index';
import {User} from '@api/user/types';
import {AnalyticsEventLogger} from '@store/modules/Analytics/constants';
import {ReferralsActions} from '@store/modules/Referrals/actions';
import {getReferralUserSelector} from '@store/modules/Referrals/selectors';
import {getErrorMessage} from '@utils/errors';
import {call, put, select} from 'redux-saga/effects';

const actionCreator = ReferralsActions.PING_REFERRAL(null).START.create;

export function* pingUserSaga(action: ReturnType<typeof actionCreator>) {
  const {userId} = action.payload;
  try {
    yield Api.notifications.pingUser({
      userId,
    });

    yield put(
      ReferralsActions.PING_REFERRAL(action.id).SUCCESS.create({
        userId,
      }),
    );
    const user: User | undefined = yield select(
      getReferralUserSelector({userId}),
    );
    yield call(AnalyticsEventLogger.trackPingUser, {
      username: user?.username ?? '',
    });
  } catch (error) {
    yield put(
      ReferralsActions.PING_REFERRAL(action.id).FAILED.create({
        userId,
        errorMessage: getErrorMessage(error),
      }),
    );
    throw error;
  }
}
