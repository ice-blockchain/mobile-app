// SPDX-License-Identifier: ice License 1.0

import {Api} from '@api/index';
import {
  appLocaleSelector,
  userSelector,
} from '@store/modules/Account/selectors';
import {NewsActions} from '@store/modules/News/actions';
import {getErrorMessage} from '@utils/errors';
import {call, put, SagaReturnType, select} from 'redux-saga/effects';

export function* loadUnreadNewsCountSaga() {
  const user: SagaReturnType<typeof userSelector> = yield select(userSelector);

  const locale: SagaReturnType<typeof appLocaleSelector> = yield select(
    appLocaleSelector,
  );

  try {
    const {
      data: {count},
    }: SagaReturnType<typeof Api.news.getUnreadNewsCount> = yield call(
      Api.news.getUnreadNewsCount,
      {
        language: locale,
        createdAfter: user?.createdAt,
      },
    );

    yield put(
      NewsActions.UNREAD_NEWS_COUNT_LOAD.SUCCESS.create({
        count,
      }),
    );
  } catch (error) {
    const errorMessage = getErrorMessage(error);

    yield put(NewsActions.UNREAD_NEWS_COUNT_LOAD.FAILED.create(errorMessage));

    throw error;
  }
}
