// SPDX-License-Identifier: ice License 1.0

import {Api} from '@api/index';
import {userIdSelector} from '@store/modules/Account/selectors';
import {ReferralsActions} from '@store/modules/Referrals/actions';
import {getErrorMessage} from '@utils/errors';
import {put, SagaReturnType, select} from 'redux-saga/effects';

const actionCreator = ReferralsActions.GET_REFERRALS({})(null).START.create;

export function* getReferralsSaga(action: ReturnType<typeof actionCreator>) {
  const {referralType, offset} = action.payload;

  const userId: string = yield select(userIdSelector);

  try {
    const result: SagaReturnType<typeof Api.referrals.getReferrals> =
      yield Api.referrals.getReferrals({
        userId,
        referralType,
        offset,
        limit: 20,
      });

    yield put(
      ReferralsActions.GET_REFERRALS({referralType})(
        referralType,
      ).SUCCESS.create(offset, result),
    );
  } catch (error) {
    yield put(
      ReferralsActions.GET_REFERRALS({referralType})(
        referralType,
      ).FAILED.create(getErrorMessage(error)),
    );
    throw error;
  }
}
