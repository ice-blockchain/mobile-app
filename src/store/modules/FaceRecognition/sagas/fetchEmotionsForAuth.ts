// SPDX-License-Identifier: ice License 1.0

import {Api} from '@api/index';
import {dayjs} from '@services/dayjs';
import {userIdSelector} from '@store/modules/Account/selectors';
import {FaceRecognitionActions} from '@store/modules/FaceRecognition/actions';
import {showError} from '@utils/errors';
import axios from 'axios';
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
    if (
      axios.isAxiosError(error) &&
      (error.response?.data?.code === 'USER_DISABLED' ||
        error?.code === 'USER_DISABLED')
    ) {
      yield put(
        FaceRecognitionActions.FETCH_EMOTIONS_FOR_AUTH.FAILURE.create({
          status: 'BANNED',
        }),
      );
    } else if (
      axios.isAxiosError(error) &&
      (error.response?.data?.code === 'RATE_LIMIT_EXCEEDED' ||
        error.response?.data?.code === 'RATE_LIMIT_NEGATIVE_EXCEEDED')
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
