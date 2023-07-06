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
    options: {
      isInitial: boolean;
      query: string;
      nextOffset: number;
      hasNext: boolean;
    },
  ) => ({
    result,
    ...options,
  }),
  FAILED: (errorMessage: string) => ({
    errorMessage,
  }),
  CLEAR: true,
});

export const createCollectionAction = <T, K extends string>(key: K) =>
  createAction(key, createActionStructure<T>());
