// SPDX-License-Identifier: ice License 1.0

import {MainNavigationParams} from '@navigation/Main';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {QuizActions} from '@store/modules/Quiz/actions';
import {
  correctAnswersSelector,
  currentQuestionCountSelector,
  incorrectAnswersSelector,
  maxQuestionsCountSelector,
  questionOptionsSelector,
  questionTitleSelector,
  quizResultSelector,
} from '@store/modules/Quiz/selectors';
import {isLoadingSelector} from '@store/modules/UtilityProcessStatuses/selectors';
import {shuffle} from 'lodash';
import {useEffect, useMemo} from 'react';
import {useDispatch, useSelector} from 'react-redux';

export const useQuizQuestionnaire = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<MainNavigationParams>>();

  const maxQuestions = useSelector(maxQuestionsCountSelector);
  const currentQuestionCount = useSelector(currentQuestionCountSelector);
  const correctAnswers = useSelector(correctAnswersSelector);
  const incorrectAnswers = useSelector(incorrectAnswersSelector);
  const quizResult = useSelector(quizResultSelector);
  const questionTitle = useSelector(questionTitleSelector);
  const options = useSelector(questionOptionsSelector);

  const shuffledOptions = useMemo(() => {
    return shuffle(options);
  }, [options]);

  const dispatch = useDispatch();

  const isLoadingQuiz = useSelector(
    isLoadingSelector.bind(null, QuizActions.START_OR_CONTINUE_QUIZ),
  );

  useEffect(() => {
    if (quizResult) {
      navigation.replace(
        quizResult === 'SUCCESS' ? 'QuizSuccess' : 'QuizFailure',
      );
    }
  }, [quizResult, navigation]);

  const submitAnswer = (index: number) => {
    const originalIndex = options.indexOf(shuffledOptions[index]);
    dispatch(
      QuizActions.START_OR_CONTINUE_QUIZ.START.create({
        selectedOption: originalIndex,
      }),
    );
  };

  return {
    isLoadingQuiz,
    submitAnswer,
    maxQuestions,
    currentQuestionCount,
    correctAnswers,
    incorrectAnswers,
    questionTitle,
    options: shuffledOptions,
  };
};
