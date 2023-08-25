// SPDX-License-Identifier: ice License 1.0

import {ReferralsActions} from '@store/modules/Referrals/actions';
import {referralsToPingSelector} from '@store/modules/Referrals/selectors';
import {Task} from 'redux-saga';
import {
  cancel,
  cancelled,
  fork,
  put,
  SagaReturnType,
  select,
  take,
} from 'redux-saga/effects';

const actionCreator = ReferralsActions.PING_REFERRALS.START.create;

function* processingPingReferralsSaga(startFromUserId: string) {
  try {
    while (true) {
      const {
        data,
        hasNext,
      }: SagaReturnType<ReturnType<typeof referralsToPingSelector>> =
        yield select(
          referralsToPingSelector({
            referralType: 'T1',
            userId: startFromUserId,
          }),
        );

      if (data.length === 0 && !hasNext) {
        yield put(ReferralsActions.PING_REFERRALS.RESET.create());
        return;
      }

      if (data.length > 0) {
        const userIdToPing = data[0];
        yield put(
          ReferralsActions.PING_REFERRAL(userIdToPing).START.create({
            userId: userIdToPing,
          }),
        );

        yield take([
          ReferralsActions.PING_REFERRAL(userIdToPing).SUCCESS.type,
          ReferralsActions.PING_REFERRAL(userIdToPing).FAILED.type,
        ]);
        yield put(ReferralsActions.UPDATE_PING_COUNTER.STATE.create());
      }

      if (data.length <= 4 && hasNext) {
        yield put(
          ReferralsActions.GET_REFERRALS({referralType: 'T1'})(
            null,
          ).START.create({
            isInitial: false,
          }),
        );

        yield take([
          ReferralsActions.GET_REFERRALS({referralType: 'T1'})(null).SUCCESS
            .type,
          ReferralsActions.GET_REFERRALS({referralType: 'T1'})(null).FAILED
            .type,
        ]);
      }
    }
  } finally {
    const isCancelled: boolean = yield cancelled();
    if (isCancelled) {
      // Saga has been cancelled
    }
  }
}

export function* pingReferralsSaga(action: ReturnType<typeof actionCreator>) {
  const {userId} = action.payload;

  // start the task in the background
  const bgSyncTask: Task = yield fork(processingPingReferralsSaga, userId);

  // wait for the user stop action
  yield take(ReferralsActions.PING_REFERRALS.RESET.type);

  // user clicked stop. cancel the background task
  yield cancel(bgSyncTask);
}
