// SPDX-License-Identifier: ice License 1.0

import {FaceAuthActions} from '@store/modules/FaceAuth/actions';
import {initFaceAuthSaga} from '@store/modules/FaceAuth/sagas/initFaceAuth';
import {takeLatest} from 'redux-saga/effects';

export const faceAuthWatchers = [
  takeLatest(FaceAuthActions.FACE_AUTH.START.type, initFaceAuthSaga),
];
