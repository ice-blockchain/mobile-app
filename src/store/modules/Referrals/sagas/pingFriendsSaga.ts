// SPDX-License-Identifier: ice License 1.0

import {Api} from '@api/index';
import {AnalyticsEventLogger} from '@store/modules/Analytics/constants';
import {ReferralsActions} from '@store/modules/Referrals/actions';
import {
  getReferralUserSelector,
  referralsToPingSelector,
} from '@store/modules/Referrals/selectors';
import {getErrorMessage} from '@utils/errors';
import {
  call,
  delay,
  put,
  race,
  SagaReturnType,
  select,
  take,
} from 'redux-saga/effects';

const actionCreator = ReferralsActions.PING_FRIENDS(null).START.create;

export function* pingFriendsSaga(action: ReturnType<typeof actionCreator>) {
  const {
    data,
    hasNext,
  }: SagaReturnType<ReturnType<typeof referralsToPingSelector>> = yield select(
    referralsToPingSelector({referralType: 'T1'}),
  );

  console.log('pingFriendsSaga STARTED');

  while (data.length > 0 || (data.length === 0 && !hasNext)) {
    console.log('pingFriendsSaga WHILE');
    const {reset} = yield race({
      reset: take(ReferralsActions.PING_FRIENDS(null).RESET.type),
    });

    if (reset) {
      return;
    }

    console.log('pingFriendsSaga AFTER RESET');

    if ((data.length <= 4 && !hasNext) || (data.length > 0 && !hasNext)) {
      yield call(pingUser, data[0], action.id);
    } else if (data.length > 0 && hasNext) {
      yield put(
        ReferralsActions.GET_REFERRALS({referralType: 'T1'})(null).START.create(
          {
            isInitial: false,
          },
        ),
      );
      yield call(pingUser, data[0], action.id);
    }
  }
}

function* pingUser(userId: string, actionId: string | number | undefined) {
  try {
    yield Api.notifications.pingUser({
      userId,
    });

    yield put(
      ReferralsActions.PING_FRIENDS(actionId).SUCCESS.create({
        userId,
      }),
    );
    const result: SagaReturnType<ReturnType<typeof getReferralUserSelector>> =
      yield select(getReferralUserSelector({userId}));
    yield call(AnalyticsEventLogger.trackPingUser, {
      username: result?.username ?? '',
    });
    yield delay(1000);
  } catch (error) {
    yield put(
      ReferralsActions.PING_FRIENDS(actionId).FAILED.create({
        userId,
        errorMessage: getErrorMessage(error),
      }),
    );
    throw error;
  }
}
