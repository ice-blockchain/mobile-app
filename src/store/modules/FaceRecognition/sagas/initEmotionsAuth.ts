// SPDX-License-Identifier: ice License 1.0

import {FACE_RECOGNITION_PICTURE_SIZE} from '@api/faceRecognition/constants';
import {Api} from '@api/index';
import {userIdSelector} from '@store/modules/Account/selectors';
import {FaceRecognitionActions} from '@store/modules/FaceRecognition/actions';
import {
  emotionsAuthEmotionsSelector,
  emotionsAuthSessionExpiredAtSelector,
  emotionsAuthSessionSelector,
} from '@store/modules/FaceRecognition/selectors';
import {returnSecondIfNew} from '@utils/array';
import {showError} from '@utils/errors';
import {extractFramesWithFFmpeg} from '@utils/ffmpeg';
import axios from 'axios';
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
    const sessionExpiredAt: ReturnType<
      typeof emotionsAuthSessionExpiredAtSelector
    > = yield select(emotionsAuthSessionExpiredAtSelector);
    const isSessionExpired = sessionExpiredAt
      ? Date.now() >= sessionExpiredAt
      : false;
    if (isSessionExpired) {
      yield put(
        FaceRecognitionActions.EMOTIONS_AUTH.FAILURE.create({
          status: 'SESSION_EXPIRED',
        }),
      );
      return;
    }

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
          emotions: returnSecondIfNew(emotions, response.emotions),
        }),
      );
    }
  } catch (error: unknown) {
    if (
      axios.isAxiosError(error) &&
      (error.response?.data?.code === 'RATE_LIMIT_EXCEEDED' ||
        error.response?.data?.code === 'RATE_LIMIT_NEGATIVE_EXCEEDED')
    ) {
      yield put(
        FaceRecognitionActions.EMOTIONS_AUTH.FAILURE.create({
          status: 'BANNED',
        }),
      );
    } else if (
      axios.isAxiosError(error) &&
      (error.response?.data?.code === 'RATE_LIMIT_EXCEEDED' ||
        error.response?.data?.code === 'RATE_LIMIT_NEGATIVE_EXCEEDED')
    ) {
      yield put(
        FaceRecognitionActions.EMOTIONS_AUTH.FAILURE.create({
          status: 'TRY_LATER',
        }),
      );
    } else if (
      axios.isAxiosError(error) &&
      (error.code === 'SESSION_TIMED_OUT' ||
        error.code === 'SESSION_NOT_FOUND' ||
        error.response?.data?.code === 'SESSION_TIMED_OUT' ||
        error.response?.data?.code === 'SESSION_NOT_FOUND')
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
      if (
        axios.isAxiosError(error) &&
        error.response?.status != null &&
        error.response?.status >= 500
      ) {
        yield spawn(showError, error);
      }
    }
    throw error;
  }
}
