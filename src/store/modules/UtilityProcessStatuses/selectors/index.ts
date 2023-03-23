// SPDX-License-Identifier: ice License 1.0

import {ActionData} from '@store/modules/UtilityProcessStatuses/reducer';
import {RootState} from '@store/rootReducer';
import lodashGet from 'lodash/get';

interface Action {
  id?: string | number;
  majorType: string;
}

const processStatusesRootSelector = (state: RootState) =>
  state.utilityProcessStatuses;

export const processStatusForActionSelector = (
  state: RootState,
  action: Action,
): ActionData | undefined =>
  lodashGet(
    processStatusesRootSelector(state),
    action.id ? `${action.majorType}.${action.id}` : `${action.majorType}`,
  ) as ActionData;

export const isLoadingSelector = (action: Action, state: RootState) => {
  const requestData = processStatusForActionSelector(state, action);

  return !!(requestData && requestData.status === 'START');
};

export const isSuccessSelector = (action: Action, state: RootState) => {
  const requestData = processStatusForActionSelector(state, action);

  return !!(requestData && requestData.status === 'SUCCESS');
};

export const isFailedSelector = (action: Action, state: RootState) => {
  const requestData = processStatusForActionSelector(state, action);

  return !!(requestData && requestData.status === 'FAILED');
};

export const isFinishedSelector = (action: Action, state: RootState) => {
  const requestData = processStatusForActionSelector(state, action);

  return !!(
    requestData &&
    (requestData.status === 'SUCCESS' || requestData.status === 'FAILED')
  );
};

export const actionPayloadSelector = (action: Action, state: RootState) => {
  const requestData = processStatusForActionSelector(state, action);

  return lodashGet(requestData, 'payload');
};

export const actionTimestampSelector = (
  action: Action,
  state: RootState,
): number => {
  const requestData = processStatusForActionSelector(state, action);

  return lodashGet(requestData, 'timestamp', 0);
};

export const successActionTimestampSelector = (
  action: Action,
  state: RootState,
): number => {
  const isSuccess = isSuccessSelector(action, state);

  if (isSuccess) {
    return actionTimestampSelector(action, state);
  }

  return 0;
};

export const failedReasonSelector = (
  action: Action,
  state: RootState,
): string | undefined => {
  const isFailed = isFailedSelector(action, state);

  if (isFailed) {
    const requestData = processStatusForActionSelector(state, action);

    return lodashGet(requestData?.payload, 'errorMessage');
  }

  return undefined;
};
