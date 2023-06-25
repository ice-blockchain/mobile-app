// SPDX-License-Identifier: ice License 1.0

import {LinkingActions} from '@store/modules/Linking/actions';
import {takeLatest} from 'redux-saga/effects';

import {handleUrlSaga} from './handleUrlSaga';

export const linkingWatchers = [
  takeLatest(LinkingActions.HANDLE_URL.STATE.type, handleUrlSaga),
];
