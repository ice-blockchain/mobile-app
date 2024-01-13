// SPDX-License-Identifier: ice License 1.0

import {QuizData, User} from '@api/user/types';
import {navigate} from '@navigation/utils';
import {AccountActions} from '@store/modules/Account/actions';
import {
  isAuthorizedSelector,
  userSelector,
} from '@store/modules/Account/selectors';
import {isAppActiveSelector} from '@store/modules/AppCommon/selectors';
import {
  call,
  CallEffect,
  put,
  SagaReturnType,
  select,
} from 'redux-saga/effects';

export function* acceptQuizTermsSaga() {
  const isAppActive: ReturnType<typeof isAppActiveSelector> = yield select(
    isAppActiveSelector,
  );
  const isAuthorized: ReturnType<typeof isAuthorizedSelector> = yield select(
    isAuthorizedSelector,
  );

  const user: SagaReturnType<typeof userSelector> = yield select(userSelector);
  if (!isAppActive || !isAuthorized) {
    return;
  }

  if (user) {
    yield call(updateQuizData, user, {quizTermsAccepted: true});
    navigate({name: 'QuizTheme', params: undefined});
  }
}

function* updateQuizData(user: User, params: QuizData) {
  if (params) {
    yield put(
      AccountActions.UPDATE_ACCOUNT.START.create(
        {
          clientData: {
            ...(user.clientData ?? {}),
            quiz: {...params},
          },
        },
        function* (
          freshUser,
        ): Generator<CallEffect<void>, {retry: boolean}, void> {
          if (
            freshUser.clientData?.quiz?.quizTermsAccepted !==
            params.quizTermsAccepted
          ) {
            yield call(updateQuizData, freshUser, params);
          }
          return {retry: false};
        },
      ),
    );
  }
}
