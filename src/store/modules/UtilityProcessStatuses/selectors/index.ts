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

const isLoadingSelector = (state: RootState, action: Action) => {
  const requestData = getProcessStatusForActionSelector(state, action);

  return !!(requestData && requestData.status === ActionSubtype.START);
};

const isSuccessSelector = (state: RootState, action: Action) => {
  const requestData = getProcessStatusForActionSelector(state, action);

  return !!(requestData && requestData.status === ActionSubtype.SUCCESS);
};

const isFailedSelector = (state: RootState, action: Action) => {
  const requestData = getProcessStatusForActionSelector(state, action);

  return !!(requestData && requestData.status === ActionSubtype.FAILED);
};

const getActionPayloadSelector = (state: RootState, action: Action) => {
  const requestData = getProcessStatusForActionSelector(state, action);

  return lodashGet(requestData, 'payload');
};

const getActionTimestampSelector = (
  state: RootState,
  action: Action,
): number => {
  const requestData = getProcessStatusForActionSelector(state, action);

  return lodashGet(requestData, 'timestamp', 0);
};

const getSuccessActionTimestampSelector = (
  state: RootState,
  action: Action,
): number => {
  const isSuccess = isSuccessSelector(state, action);

  if (isSuccess) {
    return getActionTimestampSelector(state, action);
  }

  return 0;
};

const getFailedReasonSelector = (
  state: RootState,
  action: Action,
): string | undefined => {
  const isFailed = isFailedSelector(state, action);

  if (isFailed) {
    const requestData = getProcessStatusForActionSelector(state, action);

    return lodashGet(requestData?.payload, 'errorMessage');
  }

  return undefined;
};

export const UtilsProcessStatusSelectors = Object.freeze({
  getActionPayloadSelector,
  getActionTimestampSelector,
  getFailedReasonSelector,
  getSuccessActionTimestampSelector,
  isFailedSelector,
  isLoadingSelector,
  isSuccessSelector,
});
