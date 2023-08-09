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
  const {
    data,
    hasNext,
  }: SagaReturnType<ReturnType<typeof referralsToPingSelector>> = yield select(
    referralsToPingSelector({referralType: 'T1'}),
  );

  while (true) {
    const {reset} = yield race({
      reset: take(ReferralsActions.PING_FRIENDS.RESET.type),
      delay: delay(1000),
    });

    if (reset) {
      return;
    }

    /** If there are referrals to ping or there are no
     * referrals to ping but we can try to load next batch
     */

    if (data.length > 0 || (data.length === 0 && hasNext)) {
      /**
       * If there are 0 to 4 referrals to ping available and
       * there are no more referrals to load
       * or
       * If there are 4 referrals to ping available and
       * there are more referrals to load
       */
      if (
        (data.length > 0 && data.length <= 4 && !hasNext) ||
        (data.length === 4 && hasNext)
      ) {
        yield put(
          ReferralsActions.PING_REFERRAL().START.create({userId: data[0]}),
        );
      } else if (hasNext) {
        /**
         * If we can load next batch of referrals
         */
        yield put(
          ReferralsActions.GET_REFERRALS({referralType: 'T1'})(
            null,
          ).START.create({
            isInitial: false,
          }),
        );
        if (data.length > 0) {
          yield put(
            ReferralsActions.PING_REFERRAL().START.create({userId: data[0]}),
          );
        }
      }
    }
  }
}
