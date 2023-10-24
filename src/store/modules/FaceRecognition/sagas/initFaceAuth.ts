// SPDX-License-Identifier: ice License 1.0

import {is5xxApiError, isApiError} from '@api/client';
import {Api} from '@api/index';
import {userIdSelector} from '@store/modules/Account/selectors';
import {FaceRecognitionActions} from '@store/modules/FaceRecognition/actions';
import {getCroppedPictureUri} from '@store/modules/FaceRecognition/utils';
import {showError} from '@utils/errors';
import {getPictureCropStartY} from '@utils/ffmpeg';
import {call, put, SagaReturnType, select, spawn} from 'redux-saga/effects';

type Actions = ReturnType<typeof FaceRecognitionActions.FACE_AUTH.START.create>;
export function* initFaceAuthSaga(action: Actions) {
  try {
    const {pictureUri, pictureWidth, pictureHeight} = action.payload;

    const cropStartY: SagaReturnType<typeof getPictureCropStartY> = yield call(
      getPictureCropStartY,
      {pictureWidth, pictureHeight},
    );

    const croppedPictureUri: SagaReturnType<typeof getCroppedPictureUri> =
      yield call(getCroppedPictureUri, {
        pictureUri,
        cropStartY,
        pictureWidth,
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
