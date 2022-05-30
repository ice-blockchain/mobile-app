// SPDX-License-Identifier: BUSL-1.1

import {Api} from '@api/index';
import {ReferralsActions} from '@store/modules/Referrals/actions';
import {ReferralHistory} from '@store/modules/Referrals/reducer';
import {put} from 'redux-saga/effects';

const actionCreator =
  ReferralsActions.GET_REFERRALS_HISTORY_BY_USER_ID.START.create;

export function* getReferralsSaga(action: ReturnType<typeof actionCreator>) {
  try {
    const {userId} = action.payload;
    const response: ReferralHistory[] =
      yield Api.referrals.getReferralsHistoryByUserId({userId});
    yield put(
      ReferralsActions.GET_REFERRALS_HISTORY_BY_USER_ID.SUCCESS.create(
        response,
      ),
    );
  } catch (error) {
    let errorMessage = 'Failed';
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    yield put(
      ReferralsActions.GET_REFERRALS_HISTORY_BY_USER_ID.FAILED.create(
        errorMessage,
      ),
    );
  }
}
