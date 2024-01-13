// SPDX-License-Identifier: ice License 1.0

import {AccountActions} from '@store/modules/Account/actions';
import {QuizActions} from '@store/modules/Quiz/actions';
import {isLoadingSelector} from '@store/modules/UtilityProcessStatuses/selectors';
import {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';

export const useSetQuizTerms = () => {
  const dispatch = useDispatch();
  const [termsAccepted, setTermsAccepted] = useState(false);

  const confirmTerms = () => {
    dispatch(QuizActions.ACCEPT_QUIZ_TERMS.STATE.create());
  };

  const isConfirmLoading = useSelector(
    isLoadingSelector.bind(null, AccountActions.UPDATE_ACCOUNT),
  );

  return {termsAccepted, setTermsAccepted, confirmTerms, isConfirmLoading};
};
