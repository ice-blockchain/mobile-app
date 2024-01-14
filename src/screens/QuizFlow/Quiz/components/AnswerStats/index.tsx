// SPDX-License-Identifier: ice License 1.0

import {COLORS} from '@constants/colors';
import {AnswersCounter} from '@screens/QuizFlow/Quiz/components/AnswerStats/components/AnswersCounter';
import {
  correctAnswersSelector,
  incorrectAnswersSelector,
} from '@store/modules/Quiz/selectors';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {useSelector} from 'react-redux';
import {rem} from 'rn-units';

export const ANSWER_STARTS_HEIGHT = rem(32);

export const AnswerStats = () => {
  const correctAnswers = useSelector(correctAnswersSelector);
  const incorrectAnswers = useSelector(incorrectAnswersSelector);

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
    alignItems: 'center',
    flexDirection: 'row',
    paddingBottom: rem(12),
    height: ANSWER_STARTS_HEIGHT,
  },
  verticalSeparator: {
    marginHorizontal: rem(20),
    width: rem(1),
    height: '100%',
    backgroundColor: COLORS.secondaryFaint,
  },
});
