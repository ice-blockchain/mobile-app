// SPDX-License-Identifier: ice License 1.0

import {isApiError} from '@api/client';
import {Api} from '@api/index';
import {
  isAuthorizedSelector,
  userIdSelector,
} from '@store/modules/Account/selectors';
import {isAppActiveSelector} from '@store/modules/AppCommon/selectors';
import {TokenomicsActions} from '@store/modules/Tokenomics/actions';
import {getErrorMessage} from '@utils/errors';
import {call, put, SagaReturnType, select} from 'redux-saga/effects';

export function* getRankingSummarySaga(
  action?: ReturnType<
    typeof TokenomicsActions.GET_RANKING_SUMMARY.START.create
  >,
) {
  try {
    const isAuthorized: ReturnType<typeof isAuthorizedSelector> = yield select(
      isAuthorizedSelector,
    );
    const isAppActive: ReturnType<typeof isAppActiveSelector> = yield select(
      isAppActiveSelector,
    );

    if (!isAuthorized || !isAppActive) {
      return null;
    }

    const userId: ReturnType<typeof userIdSelector> =
      action?.payload?.userId ?? (yield select(userIdSelector));
    const {
      data: rankingSummary,
    }: SagaReturnType<typeof Api.tokenomics.getRankingSummary> = yield call(
      Api.tokenomics.getRankingSummary,
      {userId},
    );

    yield put(
      TokenomicsActions.GET_RANKING_SUMMARY.SUCCESS.create({
        userId,
        rankingSummary,
      }),
    );
  } catch (error) {
    if (
      isApiError(error, 403, 'GLOBAL_RANK_HIDDEN') &&
      action?.payload?.userId
    ) {
      yield put(
        TokenomicsActions.GET_RANKING_SUMMARY.SUCCESS.create({
          userId: action.payload.userId,
          rankingSummary: null,
        }),
      );
    } else {
      yield put(
        TokenomicsActions.GET_RANKING_SUMMARY.FAILED.create(
          getErrorMessage(error),
        ),
      );
      throw error;
    }
  }
}
