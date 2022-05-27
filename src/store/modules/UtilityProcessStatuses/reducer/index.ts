// SPDX-License-Identifier: BUSL-1.1

import {ACTION_DIVIDER} from '@store/utils/actions/createAction';
import lodashHead from 'lodash/head';
import lodashLast from 'lodash/last';
// TODO: connect auth actions
// import AuthActions from '../Auth/actions';

type ProcessingActionStatus = 'START' | 'SUCCESS' | 'FAILED';

interface Action {
  type: string;
  id?: string | number;
  payload?: unknown;
}

export interface ActionData {
  status: ProcessingActionStatus;
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
  status: ProcessingActionStatus,
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
  // TODO: connect auth actions
  // if (action.type === AuthActions.SIGN_OUT.SUCCESS.type) {
  //   return INITIAL_STATE;
  // }

  const actionParts = action.type.split(ACTION_DIVIDER);

  if (actionParts.length < 1) {
    return state;
  }

  const status: string = lodashLast(actionParts) || '';
  const majorType: string = lodashHead(actionParts) || '';

  switch (status) {
    case 'START':
    case 'SUCCESS':
    case 'FAILED':
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

  return state;
}
