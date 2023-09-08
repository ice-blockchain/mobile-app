// SPDX-License-Identifier: ice License 1.0

import {AppCommonActions} from '@store/modules/AppCommon/actions';
import {takeLeading} from 'redux-saga/effects';

export const socialsWatchers = [
  takeLeading(
    [
      AppCommonActions.APP_STATE_CHANGE.STATE.type,
      AppCommonActions.APP_INITIALIZED.SUCCESS.type,
    ],
    openSocial,
  ),
];
