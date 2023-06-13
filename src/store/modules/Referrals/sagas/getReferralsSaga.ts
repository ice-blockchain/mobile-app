// SPDX-License-Identifier: ice License 1.0

import {Api} from '@api/index';
import {userIdSelector} from '@store/modules/Account/selectors';
import {ReferralsActions} from '@store/modules/Referrals/actions';
import {referralsSelector} from '@store/modules/Referrals/selectors';
import {getErrorMessage} from '@utils/errors';
import {put, SagaReturnType, select} from 'redux-saga/effects';

const actionCreator = ReferralsActions.GET_REFERRALS({})(null).START.create;

const LIMIT = 20;

export function* getReferralsSaga(action: ReturnType<typeof actionCreator>) {
  const {referralType, isInitial} = action.payload;

  const userId: string = yield select(userIdSelector);

  try {
    const {
      pageNumber = 0,
    }: SagaReturnType<ReturnType<typeof referralsSelector>> = yield select(
      referralsSelector({referralType}),
    );
    const result: SagaReturnType<typeof Api.referrals.getReferrals> =
      yield Api.referrals.getReferrals({
        userId,
        referralType,
        offset: pageNumber * LIMIT,
        limit: LIMIT,
      });

    yield put(
      ReferralsActions.GET_REFERRALS({referralType})(
        referralType,
      ).SUCCESS.create({result, isInitial}),
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
