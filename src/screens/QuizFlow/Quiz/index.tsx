// SPDX-License-Identifier: ice License 1.0

import {PrimaryButton} from '@components/Buttons/PrimaryButton';
import {COLORS} from '@constants/colors';
import {commonStyles} from '@constants/styles';
import {useOnHardwareBack} from '@hooks/useOnHardwareBack';
import {useScrollShadow} from '@hooks/useScrollShadow';
import {Header} from '@navigation/components/Header';
import {useFocusStatusBar} from '@navigation/hooks/useFocusStatusBar';
import {
  ANSWER_STARTS_HEIGHT,
  AnswerStats,
} from '@screens/QuizFlow/Quiz/components/AnswerStats';
import {QuestionPage} from '@screens/QuizFlow/Quiz/components/QuestionPage';
import {TimeOver} from '@screens/QuizFlow/Quiz/components/TimeOver';
import {useCancelQuiz} from '@screens/QuizFlow/Quiz/hooks/useCancelQuiz';
import {useQuestionTimeCounter} from '@screens/QuizFlow/Quiz/hooks/useQuestionTimeCounter';
import {useQuizQuestionnaire} from '@screens/QuizFlow/Quiz/hooks/useQuizQuestionnaire';
import {t} from '@translations/i18n';
import React, {useEffect} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {rem} from 'rn-units';

export const Quiz = () => {
  useFocusStatusBar({style: 'dark-content'});
  const {shadowStyle} = useScrollShadow();

  const [selectedAnswerIndex, setSelectedAnswerIndex] = React.useState<
    null | number
  >(null);

  const {cancelQuiz} = useCancelQuiz();

  const {
    isLoadingQuiz,
    maxQuestions,
    currentQuestionCount,
    questionTitle,
    options,
    submitAnswer,
  } = useQuizQuestionnaire();

  const {isCountdownOver, timerButtonTitle} = useQuestionTimeCounter();

  useOnHardwareBack({callback: cancelQuiz, preventDefault: true});

  useEffect(() => {
    setSelectedAnswerIndex(null);
  }, [options]);

  return (
    <View style={styles.container}>
      <Header
        containerStyle={shadowStyle}
        color={COLORS.primaryDark}
        title={t('quiz.quiz_questionnaire.navigation_title', {
          current: currentQuestionCount ?? 0,
          total: maxQuestions ?? 0,
        })}
        onGoBack={cancelQuiz}
        preventDefaultAction={true}>
        <AnswerStats />
      </Header>
      <ScrollView
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}>
        <QuestionPage
          onAnswerSelected={setSelectedAnswerIndex}
          selectedIndex={selectedAnswerIndex}
          question={questionTitle}
          options={options}
        />
        <TimeOver visible={isCountdownOver} />
      </ScrollView>
      <View style={[styles.buttonsContainer, commonStyles.shadow]}>
        <PrimaryButton
          onPress={() => {
            if (selectedAnswerIndex !== null || isCountdownOver) {
              submitAnswer(selectedAnswerIndex ?? 0);
            }
          }}
          text={timerButtonTitle}
          style={styles.button}
          loading={isLoadingQuiz}
          disabled={
            isLoadingQuiz || (selectedAnswerIndex === null && !isCountdownOver)
          }
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  contentContainer: {
    paddingTop: ANSWER_STARTS_HEIGHT,
    flexGrow: 1,
  },
  button: {
    height: rem(40),
    borderRadius: rem(12),
    marginHorizontal: rem(58),
  },
  buttonsContainer: {
    backgroundColor: COLORS.white,
    paddingTop: rem(16),
    paddingBottom: rem(34),
  },
});
