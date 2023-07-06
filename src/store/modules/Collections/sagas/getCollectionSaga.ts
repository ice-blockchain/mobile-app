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
    const {nextOffset}: SagaReturnType<ReturnType<typeof collectionSelector>> =
      yield select(collectionSelector(stateKey));

    const {limit = defaultPageSize, query, isInitial} = payload;

    if (request) {
      const offset = isInitial ? 0 : nextOffset;

      const {
        data,
        headers,
      }: {
        data: UnionToIntersection<SagaReturnType<typeof request>['data']>;
        headers: UnionToIntersection<SagaReturnType<typeof request>['headers']>;
      } = yield request({
        query,
        offset,
        limit,
      });

      const responseData = data ?? [];

      yield put(
        action.SUCCESS.create(responseData, {
          isInitial,
          query,

          nextOffset:
            headers?.['x-next-offset'] !== undefined
              ? Number(headers['x-next-offset'])
              : offset + limit,

          hasNext:
            headers?.['x-next-offset'] !== undefined
              ? headers['x-next-offset'] !== '0'
              : !!responseData.length,
        }),
      );
    }
  } catch (error) {
    yield put(action.FAILED.create(getErrorMessage(error)));
    throw error;
  }
}
