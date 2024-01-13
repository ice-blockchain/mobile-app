// SPDX-License-Identifier: ice License 1.0

import {PrimaryButton} from '@components/Buttons/PrimaryButton';
import {COLORS} from '@constants/colors';
import {commonStyles, windowWidth} from '@constants/styles';
import {useCountdown} from '@hooks/useCountdown';
import {useScrollShadow} from '@hooks/useScrollShadow';
import {Header} from '@navigation/components/Header';
import {useFocusStatusBar} from '@navigation/hooks/useFocusStatusBar';
import {
  AnswerStats,
  QUIZ_STATS_HEIGHT,
} from '@screens/QuizFlow/Quiz/components/AnswerStats';
import {QuestionPage} from '@screens/QuizFlow/Quiz/components/QuestionPage';
import {Result} from '@screens/QuizFlow/Quiz/components/Result';
import {useQuizQuestionnaire} from '@screens/QuizFlow/Quiz/hooks/useQuizQuestionnaire';
import {QuizSuccess} from '@screens/QuizFlow/QuizSuccess';
import {dayjs} from '@services/dayjs';
import {t} from '@translations/i18n';
import React, {useMemo} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {hasNotch} from 'react-native-device-info';
import {rem, screenWidth} from 'rn-units';

const BUTTON_CONTAINER_HEIGHT = hasNotch() ? rem(98) : rem(85);

export const Quiz = () => {
  useFocusStatusBar({style: 'dark-content'});

  const [selectedAnswerIndex, setSelectedAnswerIndex] = React.useState<
    null | number
  >(null);

  const {shadowStyle} = useScrollShadow();
  const {
    isLoadingQuiz,
    maxQuestions,
    currentQuestionCount,
    submitAnswer,
    quizResult,
    expiresAt,
  } = useQuizQuestionnaire();

  const resendDuration = useMemo(() => {
    const expirationDate = dayjs(expiresAt);
    const now = dayjs();
    const secondsLeft = expirationDate.diff(now, 's');
    return dayjs.duration(secondsLeft, 's');
  }, [expiresAt]);

  const {durationLeft, isCountdownOver, isStopped} =
    useCountdown(resendDuration);

  const timeIsOver = !isStopped && isCountdownOver;
  const secondsLeft = durationLeft.asSeconds();

  const timerButtonTitle = () => {
    let text = '';
    if (durationLeft.asMinutes() > 1) {
      const remainingMinutes = durationLeft.asMinutes().toFixed(0);
      const remainingSeconds = durationLeft.asSeconds() % 60;
      text = `${t(
        'button.continue',
      )} - ${remainingMinutes}m ${remainingSeconds}s`;
    } else {
      text = `${t('button.continue')} - ${secondsLeft}s`;
    }
    return text;
  };

  const handleContinue = () => {
    if (selectedAnswerIndex !== null) {
      setSelectedAnswerIndex(null);
      submitAnswer(selectedAnswerIndex);
    }
  };

  const handleAnswerSelection = (index: number) => {
    setSelectedAnswerIndex(index);
  };

  const title =
    currentQuestionCount && maxQuestions
      ? t('quiz.quiz_questionnaire.navigation_title', {
          current: currentQuestionCount,
          total: maxQuestions,
        })
      : '';

  return (
    <View style={styles.container}>
      <Header
        containerStyle={shadowStyle}
        color={COLORS.primaryDark}
        title={title}
        showBackButton={!quizResult}>
        {!quizResult && <AnswerStats />}
      </Header>
      <ScrollView
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}>
        {quizResult && quizResult === 'SUCCESS' && <QuizSuccess />}
        {!quizResult && (
          <>
            <QuestionPage
              onAnswerSelected={handleAnswerSelection}
              selectedIndex={selectedAnswerIndex}
            />
            <Result type={timeIsOver ? 'timeOut' : null} />
          </>
        )}
      </ScrollView>
      <View style={[styles.buttonsContainer, commonStyles.shadow]}>
        <PrimaryButton
          onPress={handleContinue}
          text={
            isCountdownOver || isStopped
              ? t('button.continue')
              : timerButtonTitle()
          }
          style={styles.button}
          loading={isLoadingQuiz}
          disabled={isLoadingQuiz || selectedAnswerIndex === null}
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
    flexGrow: 1,
    paddingBottom: BUTTON_CONTAINER_HEIGHT,
    paddingTop: QUIZ_STATS_HEIGHT,
  },
  button: {
    width: windowWidth - rem(90),
    alignItems: 'center',
    justifyContent: 'center',
    height: rem(40),
    borderRadius: rem(12),
    alignSelf: 'center',
  },
  buttonsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    position: 'absolute',
    width: screenWidth,
    height: BUTTON_CONTAINER_HEIGHT,
    bottom: 0,
    backgroundColor: COLORS.white,
    paddingTop: rem(16),
  },
});
