// SPDX-License-Identifier: ice License 1.0

/* eslint-disable @typescript-eslint/no-explicit-any */

import lodashReduce from 'lodash/reduce';

export const ACTION_DIVIDER = ' -> ';

type FullActionType<MajorType extends string, Key> = Key extends string
  ? `${MajorType}${typeof ACTION_DIVIDER}${Key}`
  : string;

interface Options {
  isMultiInstanceProcess?: boolean;
}

interface PayloadFunc {
  (...params: any[]): any;
}
interface StructureType {
  [propName: string]: PayloadFunc | boolean;
}

export type ActionFactories<
  MajorType extends string,
  T extends StructureType,
> = {
  [K in keyof T]: Readonly<{
    id?: string | number;
    type: FullActionType<MajorType, K>;
    create: (
      ...params: T[K] extends (...args: infer U) => any ? U : []
    ) => ActionObject<FullActionType<MajorType, K>, T, K>;
  }>;
} & {
  majorType: MajorType;
  id?: string | number;
};

export type StartActionFactories = ActionFactories<
  string,
  {START: PayloadFunc | boolean}
>;

export type ActionObject<
  ActionPartType,
  T extends StructureType,
  K extends keyof T,
> = {
  id?: string | number;
  type: ActionPartType;
  payload: T[K] extends (...args: any[]) => infer U ? U : undefined;
};

type CreateActionReturnType<
  MajorType extends string,
  T extends StructureType,
  O,
> = O extends {
  isMultiInstanceProcess: true;
}
  ? {
      (
        ...actionIdParts: Array<string | number | null | undefined>
      ): ActionFactories<MajorType, T>;
    }
  : ActionFactories<MajorType, T>;

/**
 *
 * @param {string} type
 * @param {T} structure
 * @param {Options} options
 */
export function createAction<
  MajorType extends string,
  T extends StructureType,
  K extends keyof T,
  O extends Options,
>(
  majorType: MajorType,
  structure: T,
  options?: O,
): CreateActionReturnType<MajorType, T, O> {
  const actionGenerator = function (
    ...actionIdParts: Array<string | number>
  ): Readonly<ActionFactories<MajorType, T>> {
    // @ts-expect-error // need to fix the problem with computed fields somehow
    const actionObject: Partial<ActionFactories<MajorType, T>> = {
      majorType,
      id:
        actionIdParts.length === 0
          ? undefined
          : actionIdParts.length === 1
          ? actionIdParts[0]
          : lodashReduce(
              actionIdParts,
              (result: string, n: string | number): string =>
                `${result}${result ? ACTION_DIVIDER : ''}${n}`,
              '',
            ),
    };

    Object.keys(structure).forEach((structureKey: keyof typeof structure) => {
      const actionPartType = `${majorType}${ACTION_DIVIDER}${String(
        structureKey,
      )}` as const;

      let createFunction = (): ActionObject<typeof actionPartType, T, K> => ({
        id: actionObject.id,
        type: actionPartType,
        payload: undefined as T[K] extends (...args: any[]) => infer U
          ? U
          : undefined,
      });

      const actionPartKey = structureKey as K;
      if (structure[actionPartKey]) {
        if (structure[actionPartKey] instanceof Function) {
          // Use function provided by consumer

          createFunction = (
            ...params
          ): ActionObject<typeof actionPartType, T, K> => ({
            id: actionObject.id,
            type: actionPartType,
            payload: (structure[actionPartKey] as PayloadFunc)(...params),
          });
        }
      }

      actionObject[actionPartKey] = {
        id: actionObject.id,
        type: actionPartType,
        create: createFunction,
      } as ActionFactories<MajorType, T>[K];
    });

    return Object.freeze(actionObject as ActionFactories<MajorType, T>);
  };

  if (options?.isMultiInstanceProcess) {
    return actionGenerator as CreateActionReturnType<MajorType, T, O>;
  } else {
    return actionGenerator() as CreateActionReturnType<MajorType, T, O>;
  }
}
