// SPDX-License-Identifier: ice License 1.0

import {createAction} from '@store/utils/actions/createAction';

const createActionStructure = <T>() => ({
  START: ({
    isInitial,
    limit,
    query = '',
  }: {
    isInitial: boolean;
    limit?: number;
    query?: string;
  }) => ({
    query,
    limit,
    isInitial,
  }),
  SUCCESS: (
    result: T[],
    {
      query,
      pageNumber,
      hasNext,
    }: {query: string; pageNumber: number; hasNext: boolean},
  ) => ({result, query, pageNumber, hasNext}),
  FAILED: (errorMessage: string) => ({
    errorMessage,
  }),
  CLEAR: true,
});

export const createCollectionAction = <T, K extends string>(key: K) =>
  createAction(key, createActionStructure<T>());
