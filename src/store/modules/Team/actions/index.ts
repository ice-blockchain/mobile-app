// SPDX-License-Identifier: BUSL-1.1

import {createAction} from '@store/utils/actions/createAction';

const SET_PHONE_NUMBER_VERIFIED = createAction('SET_PHONE_NUMBER_VERIFIED', {
  STATE: () => {},
});

export const TeamActions = Object.freeze({
  SET_PHONE_NUMBER_VERIFIED,
});
