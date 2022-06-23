// SPDX-License-Identifier: BUSL-1.1

import {createAction} from '@store/utils/actions/createAction';

const APP_LOADED = createAction('APP_LOADED', {
  STATE: true,
});

export const AppCommonActions = Object.freeze({
  APP_LOADED,
});
