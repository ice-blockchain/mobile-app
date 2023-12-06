// SPDX-License-Identifier: ice License 1.0

import {is5xxApiError, isApiError} from '@api/client';
import {Api} from '@api/index';
import {FACE_RECOGNITION_PICTURE_SIZE} from '@constants/faceRecognition';
import {userIdSelector} from '@store/modules/Account/selectors';
import {FaceRecognitionActions} from '@store/modules/FaceRecognition/actions';
import {showError} from '@utils/errors';
import {cropAndResizeWithFFmpeg, getPictureCropStartY} from '@utils/ffmpeg';
import {getFilenameFromPath} from '@utils/file';
import {cacheDirectory} from 'expo-file-system';
import {call, put, SagaReturnType, select, spawn} from 'redux-saga/effects';

type Actions = ReturnType<typeof FaceRecognitionActions.FACE_AUTH.START.create>;

export function* initFaceAuthSaga(action: Actions) {
  try {
    const {pictureUri, pictureWidth, pictureHeight} = action.payload;

    const cropStartY: SagaReturnType<typeof getPictureCropStartY> = yield call(
      getPictureCropStartY,
      {pictureWidth, pictureHeight},
    );

    const croppedPictureUri: SagaReturnType<typeof cropAndResizeWithFFmpeg> =
      yield call(cropAndResizeWithFFmpeg, {
        inputUri: pictureUri,
        outputUri: `${cacheDirectory}/cropped_${getFilenameFromPath(
          pictureUri,
        )}`,
        imgWidth: pictureWidth,
        cropStartY,
        outputSize: FACE_RECOGNITION_PICTURE_SIZE,
      });
    const userId: ReturnType<typeof userIdSelector> = yield select(
      userIdSelector,
    );

    const result: SagaReturnType<typeof Api.faceRecognition.faceAuth> =
      yield call(Api.faceRecognition.faceAuth, {
        userId,
        pictureUri: croppedPictureUri,
      });
    yield put(
      FaceRecognitionActions.FACE_AUTH.SUCCESS.create({
        skipEmotions: result?.skipEmotions,
      }),
    );
  } catch (error: unknown) {
    if (isApiError(error, 403, 'USER_DISABLED')) {
      yield put(
        FaceRecognitionActions.FACE_AUTH.FAILURE.create({
          status: 'BANNED',
        }),
      );
    } else if (
      isApiError(error, 429, 'RATE_LIMIT_EXCEEDED') ||
      isApiError(error, 429, 'RATE_LIMIT_NEGATIVE_EXCEEDED')
    ) {
      yield put(
        FaceRecognitionActions.FACE_AUTH.FAILURE.create({
          status: 'TRY_LATER',
        }),
      );
    } else {
      yield put(
        FaceRecognitionActions.FACE_AUTH.FAILURE.create({
          status: 'FAILED',
        }),
      );
      if (is5xxApiError(error)) {
        yield spawn(showError, error);
      }
    }
  }
}
