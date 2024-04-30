// SPDX-License-Identifier: ice License 1.0

import {DEFAULT_DIALOG_NO_BUTTON} from '@components/Buttons/PopUpButton';
import {MainStackParamList} from '@navigation/Main';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {QuizActions} from '@store/modules/Quiz/actions';
import {
  isLoadingSelector,
  isSuccessSelector,
} from '@store/modules/UtilityProcessStatuses/selectors';
import {t} from '@translations/i18n';
import {useEffect, useRef} from 'react';
import {useDispatch, useSelector} from 'react-redux';

export const useStartQuiz = () => {
  const startPressed = useRef(false);
  const dispatch = useDispatch();

  const quizQuestionsLoaded = useSelector(
    isSuccessSelector.bind(null, QuizActions.START_OR_CONTINUE_QUIZ),
  );

  const startQuizLoading = useSelector(
    isLoadingSelector.bind(null, QuizActions.START_OR_CONTINUE_QUIZ),
  );

  const navigation =
    useNavigation<NativeStackNavigationProp<MainStackParamList>>();

  useEffect(() => {
    if (startPressed.current && quizQuestionsLoaded) {
      navigation.replace('Quiz');
    }
  }, [quizQuestionsLoaded, navigation, startPressed]);

  const startQuiz = () => {
    navigation.navigate('PopUp', {
      title: t('quiz.confirmation_popup.title'),
      message: t('quiz.confirmation_popup.start_description'),
      buttons: [
        DEFAULT_DIALOG_NO_BUTTON,
        {
          text: t('button.confirm'),
          onPress: () => {
            startPressed.current = true;
            dispatch(QuizActions.START_OR_CONTINUE_QUIZ.START.create());
          },
        },
      ],
    });
  };
  return {
    startQuiz,
    startQuizLoading,
  };
};
