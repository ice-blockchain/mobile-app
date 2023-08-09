// SPDX-License-Identifier: ice License 1.0

import {ReferralsActions} from '@store/modules/Referrals/actions';
import {referralsToPingSelector} from '@store/modules/Referrals/selectors';
import {put, race, SagaReturnType, select, take} from 'redux-saga/effects';

export function* pingFriendsSaga() {
  const {
    data,
    hasNext,
  }: SagaReturnType<ReturnType<typeof referralsToPingSelector>> = yield select(
    referralsToPingSelector({referralType: 'T1'}),
  );

  while (data.length > 0 || (data.length === 0 && !hasNext)) {
    const {reset} = yield race({
      reset: take(ReferralsActions.PING_FRIENDS.RESET.type),
    });

    if (reset) {
      return;
    }

    if ((data.length <= 4 && !hasNext) || (data.length > 0 && !hasNext)) {
      yield put(
        ReferralsActions.PING_REFERRAL().START.create({userId: data[0]}),
      );
    } else if (data.length > 0 && hasNext) {
      yield put(
        ReferralsActions.GET_REFERRALS({referralType: 'T1'})(null).START.create(
          {
            isInitial: false,
          },
        ),
      );
      yield put(
        ReferralsActions.PING_REFERRAL().START.create({userId: data[0]}),
      );
    }
  }
}
