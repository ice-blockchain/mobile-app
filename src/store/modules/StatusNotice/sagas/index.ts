// SPDX-License-Identifier: ice License 1.0

import {AccountActions} from '@store/modules/Account/actions';
import {AppCommonActions} from '@store/modules/AppCommon/actions';
import {checkStatusNoticeSaga} from '@store/modules/StatusNotice/sagas/checkStatusNoticeSaga';
import {all, takeLatest} from 'redux-saga/effects';

export function* rootStatusNoticeSaga() {
  yield all([
    takeLatest(
      [
        AccountActions.USER_STATE_CHANGE.SUCCESS.type,
        AppCommonActions.APP_STATE_CHANGE.STATE.type,
      ],
      checkStatusNoticeSaga,
    ),
  ]);
}
