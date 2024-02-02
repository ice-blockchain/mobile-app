// SPDX-License-Identifier: ice License 1.0

import {quizTermsAcceptedSelector} from '@store/modules/Account/selectors';
import {useState} from 'react';
import {useSelector} from 'react-redux';

export const useSetQuizTerms = () => {
  const termsPreviouslyAccepted = useSelector(quizTermsAcceptedSelector);
  const [termsAccepted, setTermsAccepted] = useState(termsPreviouslyAccepted);

  return {
    termsAccepted,
    setTermsAccepted,
  };
};
