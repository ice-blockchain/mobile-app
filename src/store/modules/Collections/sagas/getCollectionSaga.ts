// SPDX-License-Identifier: ice License 1.0

import {actionsMap, CollectionAction} from '@store/modules/Collections';
import {collectionSelector} from '@store/modules/Collections/selectors';
import {getErrorMessage} from '@utils/errors';
import {put, SagaReturnType, select} from 'redux-saga/effects';

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
    const {
      request,
      defaultPageSize = DEFAULT_PAGE_SIZE,
      stateKey,
    } = actionsMap.get(action) ?? {};
    if (!stateKey) {
      return;
    }
    const {pageNumber}: SagaReturnType<ReturnType<typeof collectionSelector>> =
      yield select(collectionSelector(stateKey));

    const {limit = defaultPageSize, query, isInitial} = payload;
    const nextPageNumber = isInitial ? 0 : pageNumber + 1;
    if (request) {
      const response: UnionToIntersection<SagaReturnType<typeof request>> =
        (yield request({
          query,
          offset: nextPageNumber * limit,
          limit,
        })) ?? [];
      const hasNext = !!response.length;
      yield put(
        action.SUCCESS.create(response, {
          query,
          pageNumber: nextPageNumber,
          hasNext,
        }),
      );
    }
  } catch (error) {
    yield put(action.FAILED.create(getErrorMessage(error)));
    throw error;
  }
}
