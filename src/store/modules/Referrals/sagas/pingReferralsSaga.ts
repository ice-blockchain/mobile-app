// SPDX-License-Identifier: ice License 1.0

import {ReferralsActions} from '@store/modules/Referrals/actions';
import {
  pingSessionUserIdSelector,
  referralsToPingSelector,
} from '@store/modules/Referrals/selectors';
import {Task} from 'redux-saga';
import {
  cancel,
  delay,
  fork,
  put,
  SagaReturnType,
  select,
  take,
} from 'redux-saga/effects';

const actionCreator = ReferralsActions.PING_REFERRALS.START.create;

function* processingPingReferralsSaga(startFromUserId: string) {
  yield put(
    ReferralsActions.UPDATE_NEXT_PING_USER_ID.STATE.create({
      userId: startFromUserId,
    }),
  );

  while (true) {
    const nextUserIdToPing: ReturnType<typeof pingSessionUserIdSelector> =
      yield select(pingSessionUserIdSelector);

    if (nextUserIdToPing) {
      const {
        data,
        hasNext,
      }: SagaReturnType<ReturnType<typeof referralsToPingSelector>> =
        yield select(referralsToPingSelector('T1', nextUserIdToPing));

      if (data.length > 0) {
        const userIdToPing = data[0];

        /**
         * Next user is available for ping
         */
        if (data.length > 1) {
          yield put(
            ReferralsActions.UPDATE_NEXT_PING_USER_ID.STATE.create({
              userId: data[1],
            }),
          );
        }

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

      if (hasNext) {
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

      /**
       * Reset ping session if there are no users to ping
       */

      if (data.length <= 1 && !hasNext) {
        yield delay(300);
        yield put(ReferralsActions.PING_REFERRALS.RESET.create());
        return;
      }
    } else {
      yield delay(300);
      yield put(ReferralsActions.PING_REFERRALS.RESET.create());
      return;
    }
  }
}

export function* pingReferralsSaga(action: ReturnType<typeof actionCreator>) {
  const {userId} = action.payload;

  /**
   * start the task in the background
   */
  const bgSyncTask: Task = yield fork(processingPingReferralsSaga, userId);

  /**
   * wait for the user stop action
   */
  yield take(ReferralsActions.PING_REFERRALS.RESET.type);

  /**
   * wait for the user stop action
   */
  yield cancel(bgSyncTask);
}
