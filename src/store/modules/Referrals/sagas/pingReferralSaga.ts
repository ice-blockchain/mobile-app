// SPDX-License-Identifier: ice License 1.0

import {Api} from '@api/index';
import {AnalyticsEventLogger} from '@store/modules/Analytics/constants';
import {ReferralsActions} from '@store/modules/Referrals/actions';
import {getReferralUserSelector} from '@store/modules/Referrals/selectors';
import {getErrorMessage} from '@utils/errors';
import {call, delay, put, SagaReturnType, select} from 'redux-saga/effects';

const actionCreator = ReferralsActions.PING_REFERRAL().START.create;

export function* pingReferralSaga(action: ReturnType<typeof actionCreator>) {
  const {userId} = action.payload;

  try {
    /** One second delay after each ref ping so user can see loading indicator */
    yield delay(1000);

    yield Api.notifications.pingUser({
      userId,
    });

    yield put(
      ReferralsActions.PING_REFERRAL(action.id).SUCCESS.create({
        userId,
      }),
    );
    const result: SagaReturnType<ReturnType<typeof getReferralUserSelector>> =
      yield select(getReferralUserSelector({userId}));
    yield call(AnalyticsEventLogger.trackPingUser, {
      username: result?.username ?? '',
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
