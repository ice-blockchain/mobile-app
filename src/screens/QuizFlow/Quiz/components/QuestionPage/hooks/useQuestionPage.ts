// SPDX-License-Identifier: ice License 1.0

import {
  questionOptionsSelector,
  questionTitleSelector,
} from '@store/modules/Quiz/selectors';
import {useSelector} from 'react-redux';

export const useQuestionPage = () => {
  const questionTitle = useSelector(questionTitleSelector);
  const options = useSelector(questionOptionsSelector);

  return {
    questionTitle,
    options,
  };
};
