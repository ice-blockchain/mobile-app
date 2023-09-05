// SPDX-License-Identifier: ice License 1.0

import {createAction} from '@store/utils/actions/createAction';

const SET_FIRST_SIGN_IN_TIME = createAction('SET_FIRST_SIGN_IN_TIME', {
  STATE: true,
});

const SET_SHOWED_CREATIVE_LIBRARY = createAction(
  'SET_SHOWED_CREATIVE_LIBRARY',
  {
    STATE: true,
  },
);

export const CreativeLibraryActions = Object.freeze({
  SET_FIRST_SIGN_IN_TIME,
  SET_SHOWED_CREATIVE_LIBRARY,
});
