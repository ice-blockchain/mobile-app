// SPDX-License-Identifier: ice License 1.0

import {actionsMap, CollectionAction} from '@store/modules/Collections';
import {getErrorMessage} from '@utils/errors';
import {put, SagaReturnType} from 'redux-saga/effects';

const DEFAULT_PAGE_SIZE = 20;

export type CollectionApiRequest = (params: {
  query: string;
  limit: number;
  offset: number;
}) => Promise<unknown[]>;

export function* getCollectionSaga(
  action: CollectionAction,
  {payload}: ReturnType<CollectionAction['START']['create']>,
) {
  try {
    const {request, defaultPageSize = DEFAULT_PAGE_SIZE} =
      actionsMap.get(action) ?? {};
    const {offset, limit = defaultPageSize, query} = payload;
    if (request) {
      const response: SagaReturnType<typeof request> = yield request({
        query,
        offset,
        limit,
      });
      const hasNext = response.length === limit;
      // @ts-ignore
      yield put(action.SUCCESS.create(response, {query, offset, hasNext}));
    }
  } catch (error) {
    yield put(action.FAILED.create(getErrorMessage(error)));
    throw error;
  }
}
