// SPDX-License-Identifier: BUSL-1.1

import {Api} from '@api/index';
import {ReferralsActions} from '@store/modules/Referrals/actions';
import {put, SagaReturnType} from 'redux-saga/effects';

const actionCreator = ReferralsActions.GET_REFERRALS.START.create;

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
