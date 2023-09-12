// SPDX-License-Identifier: ice License 1.0

import {Api} from '@api/index';
import {userIdSelector} from '@store/modules/Account/selectors';
import {FaceRecognitionActions} from '@store/modules/FaceRecognition/actions';
import {emotionsAuthSessionSelector} from '@store/modules/FaceRecognition/selectors';
import {showError} from '@utils/errors';
import axios from 'axios';
import {call, put, SagaReturnType, select, spawn} from 'redux-saga/effects';

export function* fetchEmotionsForAuthSaga() {
  try {
    const sessionId: ReturnType<typeof emotionsAuthSessionSelector> =
      yield select(emotionsAuthSessionSelector);
    const userId: ReturnType<typeof userIdSelector> = yield select(
      userIdSelector,
    );
    const response: SagaReturnType<
      typeof Api.faceRecognition.fetchEmotionsForAuth
    > = yield call(Api.faceRecognition.fetchEmotionsForAuth, {
      userId,
      sessionId,
    });
    yield put(
      FaceRecognitionActions.FETCH_EMOTIONS_FOR_AUTH.SUCCESS.create({
        emotions: response.emotions,
        sessionId: response.sessionId,
      }),
    );
  } catch (error: unknown) {
    if (axios.isAxiosError(error) && error.code === 'USER_DISABLED') {
      yield put(
        FaceRecognitionActions.FETCH_EMOTIONS_FOR_AUTH.FAILURE.create({
          status: 'BANNED',
        }),
      );
    } else if (
      axios.isAxiosError(error) &&
      error.code === 'RATE_LIMIT_EXCEEDED'
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
      if (axios.isAxiosError(error) && error.status && error.status >= 500) {
        yield spawn(showError, error);
      }
    }
    throw error;
  }
}
