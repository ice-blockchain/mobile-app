// SPDX-License-Identifier: ice License 1.0

import {is5xxApiError, isApiError} from '@api/client';
import {Api} from '@api/index';
import {user} from '@api/user';
import {userIdSelector} from '@store/modules/Account/selectors';
import {FaceRecognitionActions} from '@store/modules/FaceRecognition/actions';
import {migrationUserIdSelector} from '@store/modules/Validation/selectors';
import {showError} from '@utils/errors';
import {call, put, SagaReturnType, select, spawn} from 'redux-saga/effects';

type Actions = ReturnType<
  typeof FaceRecognitionActions.FETCH_EMOTIONS_FOR_AUTH.START.create
>;

export function* fetchEmotionsForAuthSaga(action: Actions) {
  const {isPhoneMigrationFlow} = action.payload;
  try {
    const userId: ReturnType<
      typeof migrationUserIdSelector | typeof userIdSelector
    > = yield select(
      isPhoneMigrationFlow ? migrationUserIdSelector : userIdSelector,
    );

    if (isPhoneMigrationFlow && !user) {
      throw new Error('Migration user is not defined');
    }

    const response: SagaReturnType<
      typeof Api.faceRecognition.fetchEmotionsForAuth
    > = yield call(Api.faceRecognition.fetchEmotionsForAuth, {
      userId: userId!,
      isPhoneMigrationFlow: isPhoneMigrationFlow,
    });
    yield put(
      FaceRecognitionActions.FETCH_EMOTIONS_FOR_AUTH.SUCCESS.create({
        emotions: response.emotions,
        sessionId: response.sessionId,
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
