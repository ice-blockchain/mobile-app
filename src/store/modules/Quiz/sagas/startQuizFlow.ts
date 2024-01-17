// SPDX-License-Identifier: ice License 1.0

import {navigate} from '@navigation/utils';
import {quizTermsAcceptedSelector} from '@store/modules/Account/selectors';
import {select} from 'redux-saga/effects';

export function* startQuizFlowSaga() {
  const quizTermsAccepted: ReturnType<typeof quizTermsAcceptedSelector> =
    yield select(quizTermsAcceptedSelector);

  if (quizTermsAccepted) {
    navigate({name: 'QuizIntro', params: undefined});
  } else {
    navigate({name: 'QuizTerms', params: undefined});
  }
}
