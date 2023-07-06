// SPDX-License-Identifier: ice License 1.0

import {Api} from '@api/index';
import {userIdSelector} from '@store/modules/Account/selectors';
import {ReferralsActions} from '@store/modules/Referrals/actions';
import {getTimezoneOffset} from '@utils/device';
import {getErrorMessage} from '@utils/errors';
import {put, SagaReturnType, select} from 'redux-saga/effects';

export function* getReferralsHistorySaga() {
  const userId: ReturnType<typeof userIdSelector> = yield select(
    userIdSelector,
  );
  try {
    const {
      data: response,
    }: SagaReturnType<typeof Api.referrals.getReferralsHistoryByUserId> =
      yield Api.referrals.getReferralsHistoryByUserId({
        userId,
        tz: getTimezoneOffset(),
      });
    yield put(ReferralsActions.GET_REFERRALS_HISTORY.SUCCESS.create(response));
  } catch (error) {
    yield put(
      ReferralsActions.GET_REFERRALS_HISTORY.FAILED.create(
        getErrorMessage(error),
      ),
    );
    throw error;
  }
}
