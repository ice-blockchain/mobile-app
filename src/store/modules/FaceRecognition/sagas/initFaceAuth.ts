// SPDX-License-Identifier: ice License 1.0

import {FACE_RECOGNITION_PICTURE_SIZE} from '@api/faceRecognition/constants';
import {Api} from '@api/index';
import {userIdSelector} from '@store/modules/Account/selectors';
import {FaceRecognitionActions} from '@store/modules/FaceRecognition/actions';
import {showError} from '@utils/errors';
import {cropAndResizeWithFFmpeg} from '@utils/ffmpeg';
import {getFilenameFromPath} from '@utils/file';
import axios from 'axios';
import {cacheDirectory} from 'expo-file-system';
import {call, put, SagaReturnType, select, spawn} from 'redux-saga/effects';

type Actions = ReturnType<typeof FaceRecognitionActions.FACE_AUTH.START.create>;

export function* initFaceAuthSaga(action: Actions) {
  try {
    const {pictureUri, cropStartY, pictureWidth} = action.payload;

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

    yield call(Api.faceRecognition.faceAuth, {
      userId,
      pictureUri: croppedPictureUri,
    });
    yield put(FaceRecognitionActions.FACE_AUTH.SUCCESS.create());
  } catch (error: unknown) {
    if (
      axios.isAxiosError(error) &&
      (error.code === 'USER_DISABLED' ||
        error.response?.data?.code === 'USER_DISABLED')
    ) {
      yield put(
        FaceRecognitionActions.FACE_AUTH.FAILURE.create({
          status: 'BANNED',
        }),
      );
    } else if (
      axios.isAxiosError(error) &&
      (error.response?.data?.code === 'RATE_LIMIT_EXCEEDED' ||
        error.response?.data?.code === 'RATE_LIMIT_NEGATIVE_EXCEEDED')
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
      if (
        axios.isAxiosError(error) &&
        error.response?.status != null &&
        error.response?.status >= 500
      ) {
        yield spawn(showError, error);
      }
    }
  }
}
