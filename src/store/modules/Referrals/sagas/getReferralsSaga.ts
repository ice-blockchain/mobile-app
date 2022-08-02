// SPDX-License-Identifier: BUSL-1.1

import {Api} from '@api/index';
import {ReferralsActions} from '@store/modules/Referrals/actions';
import {put, SagaReturnType} from 'redux-saga/effects';

const actionCreator = ReferralsActions.GET_REFERRALS(null).START.create;

export function* getReferralsSaga(action: ReturnType<typeof actionCreator>) {
  const {userId, referralType, offset} = action.payload;
  try {
    const result: SagaReturnType<typeof Api.referrals.getReferrals> =
      yield Api.referrals.getReferrals({
        userId,
        referralType,
        offset,
        limit: 20,
      });

    yield put(
      ReferralsActions.GET_REFERRALS(referralType).SUCCESS.create(
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
    yield put(
      ReferralsActions.GET_REFERRALS(referralType).FAILED.create(errorMessage),
    );
  }
}
