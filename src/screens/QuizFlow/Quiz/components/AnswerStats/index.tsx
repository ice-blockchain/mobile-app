// SPDX-License-Identifier: ice License 1.0

import {COLORS} from '@constants/colors';
import {AnswersCounter} from '@screens/QuizFlow/Quiz/components/AnswersCounter';
import {useQuizQuestionnaire} from '@screens/QuizFlow/Quiz/hooks/useQuizQuestionnaire';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {rem} from 'rn-units';

export const QUIZ_STATS_HEIGHT = rem(42);

export const AnswerStats = () => {
  const {correctAnswers, incorrectAnswers} = useQuizQuestionnaire();

  return (
    <View style={styles.container}>
      <AnswersCounter type="correct" count={correctAnswers} />
      <View style={styles.verticalSeparator} />
      <AnswersCounter type="wrong" count={incorrectAnswers} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: QUIZ_STATS_HEIGHT,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  verticalSeparator: {
    marginHorizontal: rem(20),
    width: rem(1),
    height: rem(16),
    backgroundColor: COLORS.secondaryFaint,
  },
});
