// SPDX-License-Identifier: ice License 1.0

import {is5xxApiError, isApiError} from '@api/client';
import {Api} from '@api/index';
import {FACE_RECOGNITION_PICTURE_SIZE} from '@constants/faceRecognition';
import {userIdSelector} from '@store/modules/Account/selectors';
import {FaceRecognitionActions} from '@store/modules/FaceRecognition/actions';
import {
  emotionsAuthEmotionsSelector,
  emotionsAuthSessionSelector,
  emotionsAuthStatusSelector,
} from '@store/modules/FaceRecognition/selectors';
import {isEmotionsAuthFinalised} from '@store/modules/FaceRecognition/utils';
import {shallowCompare} from '@utils/array';
import {showError} from '@utils/errors';
import {extractFramesWithFFmpeg} from '@utils/ffmpeg';
import {call, put, SagaReturnType, select, spawn} from 'redux-saga/effects';

type Actions = ReturnType<
  typeof FaceRecognitionActions.EMOTIONS_AUTH.START.create
>;

export function* initEmotionsAuthSaga(action: Actions) {
  try {
    const {videoUri, cropStartY, videoWidth} = action.payload;
    const sessionId: ReturnType<typeof emotionsAuthSessionSelector> =
      yield select(emotionsAuthSessionSelector);
    const emotions: ReturnType<typeof emotionsAuthEmotionsSelector> =
      yield select(emotionsAuthEmotionsSelector);
    const userId: ReturnType<typeof userIdSelector> = yield select(
      userIdSelector,
    );

    const frames: SagaReturnType<typeof extractFramesWithFFmpeg> = yield call(
      extractFramesWithFFmpeg,
      {
        inputUri: videoUri,
        cropStartY,
        outputSize: FACE_RECOGNITION_PICTURE_SIZE,
        width: videoWidth,
      },
    );
    const response: SagaReturnType<typeof Api.faceRecognition.emotionsAuth> =
      yield call(Api.faceRecognition.emotionsAuth, {
        userId,
        sessionId,
        pictureUris: frames,
      });
    const emotionsAuthStatus: ReturnType<typeof emotionsAuthStatusSelector> =
      yield select(emotionsAuthStatusSelector);
    // If while we were waiting for this response the whole auth is already finalised
    if (isEmotionsAuthFinalised(emotionsAuthStatus)) {
      return;
    }
    if (response.sessionEnded) {
      if (response.result) {
        yield put(FaceRecognitionActions.EMOTIONS_AUTH.SUCCESS.create());
      } else {
        yield put(
          FaceRecognitionActions.EMOTIONS_AUTH.FAILURE.create({
            status: 'TRY_LATER',
          }),
        );
      }
    } else {
      yield put(
        FaceRecognitionActions.EMOTIONS_AUTH.NEED_MORE_EMOTIONS.create({
          emotions: shallowCompare(emotions, response.emotions)
            ? emotions
            : response.emotions,
        }),
      );
    }
  } catch (error: unknown) {
    const emotionsAuthStatus: ReturnType<typeof emotionsAuthStatusSelector> =
      yield select(emotionsAuthStatusSelector);
    // If while we were waiting for this response the whole auth is already finalised
    if (isEmotionsAuthFinalised(emotionsAuthStatus)) {
      return;
    }
    if (isApiError(error, 403, 'USER_DISABLED')) {
      yield put(
        FaceRecognitionActions.EMOTIONS_AUTH.FAILURE.create({
          status: 'BANNED',
        }),
      );
    } else if (
      isApiError(error, 429, 'RATE_LIMIT_EXCEEDED') ||
      isApiError(error, 429, 'RATE_LIMIT_NEGATIVE_EXCEEDED')
    ) {
      yield put(
        FaceRecognitionActions.EMOTIONS_AUTH.FAILURE.create({
          status: 'TRY_LATER',
        }),
      );
    } else if (
      isApiError(error, 403, 'SESSION_TIMED_OUT') ||
      isApiError(error, 404, 'SESSION_NOT_FOUND')
    ) {
      yield put(
        FaceRecognitionActions.EMOTIONS_AUTH.FAILURE.create({
          status: 'SESSION_EXPIRED',
        }),
      );
    } else {
      yield put(
        FaceRecognitionActions.EMOTIONS_AUTH.FAILURE.create({
          status: 'FAILED',
        }),
      );
      if (is5xxApiError(error)) {
        yield spawn(showError, error);
      }
    }
    throw error;
  }
}
