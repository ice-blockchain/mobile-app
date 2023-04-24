// SPDX-License-Identifier: ice License 1.0

import {SocialsActions} from '@store/modules/Socials/actions';
import {getSocialsSaga} from '@store/modules/Socials/sagas/getSocials';
import {all, takeLatest} from 'redux-saga/effects';

export function* rootSocialsSaga() {
  yield all([
    takeLatest(SocialsActions.SOCIALS_LOAD.START.type, getSocialsSaga),
  ]);
}
