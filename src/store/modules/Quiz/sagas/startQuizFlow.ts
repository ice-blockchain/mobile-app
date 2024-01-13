// SPDX-License-Identifier: ice License 1.0

import {navigate} from '@navigation/utils';
import {
  isAuthorizedSelector,
  userSelector,
} from '@store/modules/Account/selectors';
import {isAppActiveSelector} from '@store/modules/AppCommon/selectors';
import {select} from 'redux-saga/effects';

export function* startQuizFlowSaga() {
  const isAuthorized: ReturnType<typeof isAuthorizedSelector> = yield select(
    isAuthorizedSelector,
  );

  const isAppActive: ReturnType<typeof isAuthorizedSelector> = yield select(
    isAppActiveSelector,
  );

  const user: ReturnType<typeof userSelector> = yield select(userSelector);

  if (isAuthorized && isAppActive) {
    if (user?.clientData?.quiz?.quizTermsAccepted) {
      /**
       * Show quiz flow
       */
      navigate({name: 'QuizTheme', params: undefined});
    } else {
      /**
       * Show quiz terms
       */
      navigate({name: 'CommunityUpdate', params: undefined});
    }
  }
}
