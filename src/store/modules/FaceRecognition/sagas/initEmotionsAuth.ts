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
import {
  getCroppedPictureUri,
  isEmotionsAuthFinalised,
} from '@store/modules/FaceRecognition/utils';
import {shallowCompare} from '@utils/array';
import {showError} from '@utils/errors';
import {
  extractCroppedFramesWithFFmpeg,
  extractFramesWithFFmpeg,
  getPictureCropStartY,
} from '@utils/ffmpeg';
import {call, put, SagaReturnType, select, spawn} from 'redux-saga/effects';

type Actions = ReturnType<
  typeof FaceRecognitionActions.EMOTIONS_AUTH.START.create
>;

async function getCroppedFrames({
  videoUri,
  pictureWidth,
  pictureHeight,
  faceDetectionEnabled,
}: {
  videoUri: string;
  pictureWidth: number;
  pictureHeight: number;
  faceDetectionEnabled: boolean;
}): Promise<string[]> {
  if (faceDetectionEnabled) {
    const frames = await extractFramesWithFFmpeg({inputUri: videoUri});
    return frames.reduce(
      async (previousPromise: Promise<string[]>, frame: string) => {
        const accumulatedFrames = await previousPromise;
        const croppedFrame = await getCroppedPictureUri({
          pictureUri: frame,
          pictureWidth,
          pictureHeight,
          faceDetectionEnabled,
        });
        return [...accumulatedFrames, croppedFrame];
      },
      Promise.resolve([]),
    );
  } else {
    const cropStartY = getPictureCropStartY({pictureWidth, pictureHeight});
    return extractCroppedFramesWithFFmpeg({
      inputUri: videoUri,
      cropStartY,
      width: pictureWidth,
      outputSize: FACE_RECOGNITION_PICTURE_SIZE,
    });
  }
}

export function* initEmotionsAuthSaga(action: Actions) {
  try {
    const {videoUri, videoWidth, videoHeight, faceDetectionEnabled} =
      action.payload;
    const sessionId: ReturnType<typeof emotionsAuthSessionSelector> =
      yield select(emotionsAuthSessionSelector);
    const emotions: ReturnType<typeof emotionsAuthEmotionsSelector> =
      yield select(emotionsAuthEmotionsSelector);
    const userId: ReturnType<typeof userIdSelector> = yield select(
      userIdSelector,
    );

    const croppedFrames: SagaReturnType<typeof getCroppedFrames> = yield call(
      getCroppedFrames,
      {
        videoUri,
        pictureWidth: videoWidth,
        pictureHeight: videoHeight,
        faceDetectionEnabled,
      },
    );
    const response: SagaReturnType<typeof Api.faceRecognition.emotionsAuth> =
      yield call(Api.faceRecognition.emotionsAuth, {
        userId,
        sessionId,
        pictureUris: croppedFrames,
      });
    const emotionsAuthStatus: ReturnType<typeof emotionsAuthStatusSelector> =
      yield select(emotionsAuthStatusSelector);
    // If while we were waiting for this response the whole auth is already finalised
    if (isEmotionsAuthFinalised(emotionsAuthStatus)) {
      return;
    }
    const lastEmotion = croppedFrames[10] ?? croppedFrames[0];
    if (response.sessionEnded) {
      if (response.result) {
        yield put(
          FaceRecognitionActions.EMOTIONS_AUTH.SUCCESS.create({
            lastEmotion,
          }),
        );
      } else {
        yield put(
          FaceRecognitionActions.EMOTIONS_AUTH.FAILURE.create({
            status: 'TRY_LATER',
            lastEmotion,
          }),
        );
      }
    } else {
      yield put(
        FaceRecognitionActions.EMOTIONS_AUTH.NEED_MORE_EMOTIONS.create({
          emotions: shallowCompare(emotions, response.emotions)
            ? emotions
            : response.emotions,
          lastEmotion,
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
