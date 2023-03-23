// SPDX-License-Identifier: ice License 1.0

import {createAction} from '@store/utils/actions/createAction';

const SHOW_RATE_APP = createAction('RATE_APP/SHOW_RATE_APP', {
  START: true,
  SUCCESS: true,
  FAILED: true,
});

export const RateAppActions = Object.freeze({
  SHOW_RATE_APP,
});
