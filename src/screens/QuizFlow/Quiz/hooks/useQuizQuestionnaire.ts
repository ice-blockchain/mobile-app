// SPDX-License-Identifier: ice License 1.0

import {MainNavigationParams} from '@navigation/Main';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {QuizActions} from '@store/modules/Quiz/actions';
import {
  correctAnswersSelector,
  currentQuestionCountSelector,
  expiresAtSelector,
  incorrectAnswersSelector,
  maxQuestionsCountSelector,
  quizResultSelector,
} from '@store/modules/Quiz/selectors';
import {
  isLoadingSelector,
  isSuccessSelector,
} from '@store/modules/UtilityProcessStatuses/selectors';
import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';

export const useQuizQuestionnaire = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<MainNavigationParams>>();

  const maxQuestions = useSelector(maxQuestionsCountSelector);
  const currentQuestionCount = useSelector(currentQuestionCountSelector);
  const correctAnswers = useSelector(correctAnswersSelector);
  const incorrectAnswers = useSelector(incorrectAnswersSelector);
  const quizResult = useSelector(quizResultSelector);
  const expiresAt = useSelector(expiresAtSelector);

  const dispatch = useDispatch();

  const isLoadingQuiz = useSelector(
    isLoadingSelector.bind(null, QuizActions.START_OR_CONTINUE_QUIZ),
  );

  const isSuccessQuiz = useSelector(
    isSuccessSelector.bind(null, QuizActions.START_OR_CONTINUE_QUIZ),
  );

  useEffect(() => {
    if (isSuccessQuiz && quizResult === 'FAILURE') {
      navigation.popToTop();
      navigation.navigate('QuizFailure');
    }
  }, [isSuccessQuiz, quizResult, navigation]);

  const submitAnswer = (index: number) => {
    dispatch(
      QuizActions.START_OR_CONTINUE_QUIZ.START.create({
        selectedOption: index,
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
    quizResult,
    expiresAt,
  };
};
