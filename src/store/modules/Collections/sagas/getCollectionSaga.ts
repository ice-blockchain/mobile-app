// SPDX-License-Identifier: ice License 1.0

import {actionsMap, CollectionAction} from '@store/modules/Collections';
import {getErrorMessage} from '@utils/errors';
import {put, SagaReturnType} from 'redux-saga/effects';

const DEFAULT_PAGE_SIZE = 20;

type UnionToIntersection<U> = (
  U extends unknown ? (k: U) => void : never
) extends (k: infer I) => void
  ? I
  : never;

export function* getCollectionSaga<
  A extends CollectionAction,
  P extends ReturnType<A['START']['create']>,
>(action: A, {payload}: P) {
  try {
    const {request, defaultPageSize = DEFAULT_PAGE_SIZE} =
      actionsMap.get(action) ?? {};
    const {offset, limit = defaultPageSize, query} = payload;
    if (request) {
      const response: UnionToIntersection<SagaReturnType<typeof request>> =
        yield request({
          query,
          offset,
          limit,
        });
      const hasNext = response.length === limit;
      yield put(action.SUCCESS.create(response, {query, offset, hasNext}));
    }
  } catch (error) {
    yield put(action.FAILED.create(getErrorMessage(error)));
    throw error;
  }
}
