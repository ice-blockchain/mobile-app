// SPDX-License-Identifier: ice License 1.0

import {SocialsActions} from '@store/modules/Socials/actions';
import {getSocialsSaga} from '@store/modules/Socials/sagas/getSocials';
import {markSharedSaga} from '@store/modules/Socials/sagas/markShared';
import {all, takeLatest} from 'redux-saga/effects';

export function* rootSocialsSaga() {
  yield all([
    takeLatest(SocialsActions.SOCIALS_LOAD.START.type, getSocialsSaga),
    takeLatest(SocialsActions.SOCIALS_MARK_SHARED.START.type, markSharedSaga),
  ]);
}
