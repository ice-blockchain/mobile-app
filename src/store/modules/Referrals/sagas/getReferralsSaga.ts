// SPDX-License-Identifier: BUSL-1.1

import {Api} from '@api/index';
import {ReferralType} from '@api/user/types';
import {ReferralsActions} from '@store/modules/Referrals/actions';
import {call, fork, put, SagaReturnType, take} from 'redux-saga/effects';

const actionCreator = ReferralsActions.GET_REFERRALS.START.create;

/**
 * Same as "takeLeading" but separated for every action.payload.referralType
 */
export function* watchGetReferrals() {
  const runningByType: {[key in ReferralType]?: boolean} = {};
  while (true) {
    const action: ReturnType<
      typeof ReferralsActions.GET_REFERRALS.START.create
    > = yield take(ReferralsActions.GET_REFERRALS.START.type);
    if (!runningByType[action.payload.referralType]) {
      yield fork(function* () {
        runningByType[action.payload.referralType] = true;
        yield call(getReferralsSaga, action);
        runningByType[action.payload.referralType] = false;
      });
    }
  }
}

export function* getReferralsSaga(action: ReturnType<typeof actionCreator>) {
  try {
    const {userId, referralType, offset} = action.payload;
    const result: SagaReturnType<typeof Api.referrals.getReferrals> =
      yield Api.referrals.getReferrals({userId, referralType, offset});
    yield put(
      ReferralsActions.GET_REFERRALS.SUCCESS.create(
        userId,
        referralType,
        offset,
        result,
      ),
    );
  } catch (error) {
    let errorMessage = 'Failed';
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    yield put(ReferralsActions.GET_REFERRALS.FAILED.create(errorMessage));
  }
}
