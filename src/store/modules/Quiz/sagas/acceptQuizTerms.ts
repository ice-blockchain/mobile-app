// SPDX-License-Identifier: ice License 1.0

import {User} from '@api/user/types';
import {AccountActions} from '@store/modules/Account/actions';
import {updateAccountSaga} from '@store/modules/Account/sagas/updateAccount';
import {unsafeUserSelector} from '@store/modules/Account/selectors';
import {QuizActions} from '@store/modules/Quiz/actions';
import {getErrorMessage} from '@utils/errors';
import {
  call,
  CallEffect,
  put,
  SagaReturnType,
  select,
} from 'redux-saga/effects';

export function* acceptQuizTermsSaga() {
  try {
    const user: SagaReturnType<typeof unsafeUserSelector> = yield select(
      unsafeUserSelector,
    );
    yield call(saveQuizTermsAccepted, user);
    yield put(QuizActions.ACCEPT_QUIZ_TERMS.SUCCESS.create());
  } catch (error) {
    yield put(
      QuizActions.ACCEPT_QUIZ_TERMS.FAILED.create(getErrorMessage(error)),
    );
  }
}

function* saveQuizTermsAccepted(user: User) {
  yield call(
    updateAccountSaga,
    AccountActions.UPDATE_ACCOUNT.START.create(
      {
        clientData: {
          ...(user.clientData ?? {}),
          quiz: {quizTermsAccepted: true},
        },
      },
      function* (
        freshUser,
      ): Generator<CallEffect<void>, {retry: boolean}, void> {
        if (!freshUser.clientData?.quiz?.quizTermsAccepted) {
          yield call(saveQuizTermsAccepted, freshUser);
        }
        return {retry: false};
      },
    ),
  );
}
