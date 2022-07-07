// SPDX-License-Identifier: BUSL-1.1

import {ActionData} from '@store/modules/UtilityProcessStatuses/reducer';
import {RootState} from '@store/rootReducer';
import {ActionSubtype} from '@store/utils/actions/subtypes';
import lodashGet from 'lodash/get';

interface Action {
  id?: string | number;
  majorType: string;
}

const processStatusesRootSelector = (state: RootState) =>
  state.utilityProcessStatuses;

export const getProcessStatusForActionSelector = (
  state: RootState,
  action: Action,
): ActionData | undefined =>
  lodashGet(
    processStatusesRootSelector(state),
    action.id ? `${action.majorType}.${action.id}` : `${action.majorType}`,
  ) as ActionData;

export const isLoadingSelector = (action: Action, state: RootState) => {
  const requestData = getProcessStatusForActionSelector(state, action);

  return !!(requestData && requestData.status === ActionSubtype.START);
};

export const isSuccessSelector = (action: Action, state: RootState) => {
  const requestData = getProcessStatusForActionSelector(state, action);

  return !!(requestData && requestData.status === ActionSubtype.SUCCESS);
};

export const isFailedSelector = (action: Action, state: RootState) => {
  const requestData = getProcessStatusForActionSelector(state, action);

  return !!(requestData && requestData.status === ActionSubtype.FAILED);
};

export const getActionPayloadSelector = (action: Action, state: RootState) => {
  const requestData = getProcessStatusForActionSelector(state, action);

  return lodashGet(requestData, 'payload');
};

export const getActionTimestampSelector = (
  action: Action,
  state: RootState,
): number => {
  const requestData = getProcessStatusForActionSelector(state, action);

  return lodashGet(requestData, 'timestamp', 0);
};

export const getSuccessActionTimestampSelector = (
  action: Action,
  state: RootState,
): number => {
  const isSuccess = isSuccessSelector(action, state);

  if (isSuccess) {
    return getActionTimestampSelector(action, state);
  }

  return 0;
};

export const getFailedReasonSelector = (
  action: Action,
  state: RootState,
): string | undefined => {
  const isFailed = isFailedSelector(action, state);

  if (isFailed) {
    const requestData = getProcessStatusForActionSelector(state, action);

    return lodashGet(requestData?.payload, 'errorMessage');
  }

  return undefined;
};
