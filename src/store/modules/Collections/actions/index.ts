// SPDX-License-Identifier: ice License 1.0

import {createAction} from '@store/utils/actions/createAction';

const createActionStructure = <T>() => ({
  START: ({
    offset,
    limit,
    query = '',
  }: {
    offset: number;
    limit?: number;
    query?: string;
  }) => ({
    query,
    limit,
    offset,
  }),
  SUCCESS: (
    result: T[],
    {query, offset, hasNext}: {query: string; offset: number; hasNext: boolean},
  ) => ({result, query, offset, hasNext}),
  FAILED: (errorMessage: string) => ({
    errorMessage,
  }),
  CLEAR: true,
});

export const createCollectionAction = <T, K extends string>(key: K) =>
  createAction(key, createActionStructure<T>());
