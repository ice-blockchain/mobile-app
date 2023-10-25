// SPDX-License-Identifier: ice License 1.0

import {takeLeading} from '@redux-saga/core/effects';
import {FaceRecognitionActions} from '@store/modules/FaceRecognition/actions';
import {fetchEmotionsForAuthSaga} from '@store/modules/FaceRecognition/sagas/fetchEmotionsForAuth';
import {initEmotionsAuthSaga} from '@store/modules/FaceRecognition/sagas/initEmotionsAuth';
import {initFaceAuthSaga} from '@store/modules/FaceRecognition/sagas/initFaceAuth';
import {takeEvery, takeLatest} from 'redux-saga/effects';

export const faceRecognitionWatchers = [
  takeLatest(FaceRecognitionActions.FACE_AUTH.START.type, initFaceAuthSaga),
  takeEvery(
    FaceRecognitionActions.EMOTIONS_AUTH.START.type,
    initEmotionsAuthSaga,
  ),
  takeLeading(
    FaceRecognitionActions.FETCH_EMOTIONS_FOR_AUTH.START.type,
    fetchEmotionsForAuthSaga,
  ),
];
