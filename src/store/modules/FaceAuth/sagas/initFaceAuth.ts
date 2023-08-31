// SPDX-License-Identifier: ice License 1.0

import {FaceAuthActions} from '@store/modules/FaceAuth/actions';
import {put} from 'redux-saga/effects';

type Actions = ReturnType<typeof FaceAuthActions.FACE_AUTH.START.create>;

export function* initFaceAuthSaga(action: Actions) {
  const {facePhoto} = action.payload;
  try {
    console.log('initFaceAuth', {facePhoto});
    // TODO: call face auth API
    yield put(FaceAuthActions.FACE_AUTH.SUCCESS.create());
  } catch {
    yield put(FaceAuthActions.FACE_AUTH.FAILED.create());
  }
}
