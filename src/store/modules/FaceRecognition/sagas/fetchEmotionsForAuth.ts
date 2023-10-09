// SPDX-License-Identifier: ice License 1.0

import {is5xxApiError, isApiError} from '@api/client';
import {Api} from '@api/index';
import {dayjs} from '@services/dayjs';
import {userIdSelector} from '@store/modules/Account/selectors';
import {FaceRecognitionActions} from '@store/modules/FaceRecognition/actions';
import {showError} from '@utils/errors';
import {call, put, SagaReturnType, select, spawn} from 'redux-saga/effects';

export function* fetchEmotionsForAuthSaga() {
  try {
    const userId: ReturnType<typeof userIdSelector> = yield select(
      userIdSelector,
    );
    const response: SagaReturnType<
      typeof Api.faceRecognition.fetchEmotionsForAuth
    > = yield call(Api.faceRecognition.fetchEmotionsForAuth, {
      userId,
    });
    yield put(
      FaceRecognitionActions.FETCH_EMOTIONS_FOR_AUTH.SUCCESS.create({
        emotions: response.emotions,
        sessionId: response.sessionId,
        sessionExpiredAt: dayjs(response.sessionExpiredAt).valueOf(),
      }),
    );
  } catch (error: unknown) {
    if (isApiError(error, 403, 'USER_DISABLED')) {
      yield put(
        FaceRecognitionActions.FETCH_EMOTIONS_FOR_AUTH.FAILURE.create({
          status: 'BANNED',
        }),
      );
    } else if (
      isApiError(error, 429, 'RATE_LIMIT_EXCEEDED') ||
      isApiError(error, 429, 'RATE_LIMIT_NEGATIVE_EXCEEDED')
    ) {
      yield put(
        FaceRecognitionActions.FETCH_EMOTIONS_FOR_AUTH.FAILURE.create({
          status: 'TRY_LATER',
        }),
      );
    } else {
      yield put(
        FaceRecognitionActions.FETCH_EMOTIONS_FOR_AUTH.FAILURE.create({
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
