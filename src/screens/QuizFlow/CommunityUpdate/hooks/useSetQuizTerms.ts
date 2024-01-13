// SPDX-License-Identifier: ice License 1.0

import {QuizActions} from '@store/modules/Quiz/actions';
import {isLoadingSelector} from '@store/modules/UtilityProcessStatuses/selectors';
import {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';

export const useSetQuizTerms = () => {
  const dispatch = useDispatch();
  const [termsAccepted, setTermsAccepted] = useState(false);

  const saveTermsAccepted = () => {
    dispatch(QuizActions.ACCEPT_QUIZ_TERMS.START.create());
  };

  const isSaveTermsAcceptedLoading = useSelector(
    isLoadingSelector.bind(null, QuizActions.ACCEPT_QUIZ_TERMS),
  );

  return {
    termsAccepted,
    setTermsAccepted,
    saveTermsAccepted,
    isSaveTermsAcceptedLoading,
  };
};
