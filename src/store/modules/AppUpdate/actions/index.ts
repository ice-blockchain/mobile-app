// SPDX-License-Identifier: ice License 1.0

import {createAction} from '@store/utils/actions/createAction';

const SET_APP_VERSION = createAction('SET_APP_VERSION', {
  STATE: (payload: {version: string}) => payload,
});

export const AppUpdateActions = Object.freeze({
  SET_APP_VERSION,
});
