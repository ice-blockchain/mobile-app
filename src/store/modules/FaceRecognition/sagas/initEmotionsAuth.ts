// SPDX-License-Identifier: ice License 1.0

import {FACE_RECOGNITION_PICTURE_SIZE} from '@api/faceRecognition/constants';
import {Api} from '@api/index';
import {userIdSelector} from '@store/modules/Account/selectors';
import {FaceRecognitionActions} from '@store/modules/FaceRecognition/actions';
import {emotionsAuthSessionSelector} from '@store/modules/FaceRecognition/selectors';
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
    yield call(Api.faceRecognition.emotionsAuth, {
      userId,
      sessionId,
      pictureUris: frames,
    });
    yield put(
      FaceRecognitionActions.EMOTIONS_AUTH.COMPLETE_WITH_STATUS.create({
        status: 'SUCCESS',
        frames,
      }),
    );
  } catch (error: unknown) {
    if (axios.isAxiosError(error) && error.code === 'USER_DISABLED') {
      yield put(
        FaceRecognitionActions.EMOTIONS_AUTH.COMPLETE_WITH_STATUS.create({
          status: 'BANNED',
        }),
      );
    } else if (
      axios.isAxiosError(error) &&
      error.code === 'RATE_LIMIT_EXCEEDED'
    ) {
      yield put(
        FaceRecognitionActions.EMOTIONS_AUTH.COMPLETE_WITH_STATUS.create({
          status: 'TRY_LATER',
        }),
      );
    } else {
      yield put(
        FaceRecognitionActions.EMOTIONS_AUTH.COMPLETE_WITH_STATUS.create({
          status: 'FAILED',
        }),
      );
      if (axios.isAxiosError(error) && error.status && error.status >= 500) {
        yield spawn(showError, error);
      }
    }
    throw error;
  }
}
