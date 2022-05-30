// SPDX-License-Identifier: BUSL-1.1

import {Api} from '@api/index';
import {ReferralsActions} from '@store/modules/Referrals/actions';
import {put} from 'redux-saga/effects';

const actionCreator = ReferralsActions.GET_REFERRALS.START.create;

export function* getReferralsSaga(action: ReturnType<typeof actionCreator>) {
  try {
    const {userId} = action.payload;
    yield Api.referrals.getReferrals({userId});
    yield put(ReferralsActions.GET_REFERRALS.SUCCESS.create());
  } catch (error) {
    let errorMessage = 'Failed';
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    yield put(ReferralsActions.GET_REFERRALS.FAILED.create(errorMessage));
  }
}
