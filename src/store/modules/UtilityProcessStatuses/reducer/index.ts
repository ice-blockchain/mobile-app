// SPDX-License-Identifier: ice License 1.0

import {ACTION_DIVIDER} from '@store/utils/actions/createAction';
import lodashHead from 'lodash/head';
import lodashLast from 'lodash/last';

interface Action {
  type: string;
  id?: string | number;
  payload?: unknown;
}

export interface ActionData {
  status: string;
  payload?: unknown;
  timestamp: number;
}

interface ProcessStatusesState {
  [majorType: string]:
    | ActionData
    | {
        [id: string]: ActionData;
      };
}

const INITIAL_STATE: ProcessStatusesState = {};

function reduceAction(
  partOfState: undefined | object,
  id: string | number | undefined,
  status: string,
  payload?: unknown,
) {
  const actionData: ActionData = {
    status,
    payload,
    timestamp: new Date().getTime(),
  };

  return id === undefined
    ? actionData
    : {
        ...partOfState,
        [id]: actionData,
      };
}

export function processStatusesReducer(state = INITIAL_STATE, action: Action) {
  const actionParts = action.type.split(ACTION_DIVIDER);

  if (actionParts.length < 1) {
    return state;
  }

  const status: string = lodashLast(actionParts) || '';
  const majorType: string = lodashHead(actionParts) || '';

  return {
    ...state,
    [majorType]: reduceAction(
      state[majorType],
      action.id,
      status,
      action.payload,
    ),
  };
}
