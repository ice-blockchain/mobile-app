// SPDX-License-Identifier: ice License 1.0

import {ReferralsActions} from '@store/modules/Referrals/actions';
import {referralsToPingSelector} from '@store/modules/Referrals/selectors';
import {
  delay,
  put,
  race,
  SagaReturnType,
  select,
  take,
} from 'redux-saga/effects';

export function* pingFriendsSaga() {
  while (true) {
    const {reset} = yield race({
      reset: take(ReferralsActions.PING_FRIENDS.RESET.type),
      delay: delay(1000),
    });

    if (reset) {
      return;
    }

    const {
      data,
      hasNext,
    }: SagaReturnType<ReturnType<typeof referralsToPingSelector>> =
      yield select(referralsToPingSelector({referralType: 'T1'}));

    if (data.length === 0 && !hasNext) {
      yield put(ReferralsActions.PING_FRIENDS.RESET.create());
      return;
    }

    if (data.length > 0) {
      const userId = data[0];
      yield put(ReferralsActions.PING_REFERRAL(userId).START.create({userId}));

      yield take([
        ReferralsActions.PING_REFERRAL(userId).SUCCESS.type,
        ReferralsActions.PING_REFERRAL(userId).FAILED.type,
      ]);
    }

    if (data.length <= 4 && hasNext) {
      yield put(
        ReferralsActions.GET_REFERRALS({referralType: 'T1'})(null).START.create(
          {
            isInitial: false,
          },
        ),
      );
    }
  }
}
