// SPDX-License-Identifier: ice License 1.0

import {COLORS} from '@constants/colors';
import {commonStyles} from '@constants/styles';
import i18n from '@translations/i18n';
import {font} from '@utils/styles';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {rem} from 'rn-units';

type AnswersCounterType = 'correct' | 'wrong';

type Props = {
  type: AnswersCounterType;
  count: number;
};

export const AnswersCounter = ({type, count}: Props) => {
  return (
    <View
      style={[
        styles.container,
        type === 'correct'
          ? styles.correctStyleContainer
          : styles.wrongStyleContainer,
        commonStyles.shadow,
      ]}>
      <View
        style={[
          styles.countContainer,
          type === 'correct' ? styles.correctStyle : styles.wrongStyle,
        ]}>
        <Text style={styles.count}>{count}</Text>
      </View>
      <Text style={styles.text}>
        {type === 'correct'
          ? i18n.t('quiz.quiz_questionnaire.correct_answers')
          : i18n.t('quiz.quiz_questionnaire.wrong_answers')}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
  },
  wrongStyleContainer: {
    justifyContent: 'flex-start',
  },
  correctStyleContainer: {
    justifyContent: 'flex-end',
  },
  countContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: rem(5),
    height: rem(20),
    minWidth: rem(20),
    borderRadius: rem(10),
  },
  count: {
    ...font(14, 19, 'bold', 'white', 'center'),
    borderRadius: 9,
  },
  text: {
    ...font(12, 17, 'medium', 'secondary', 'left'),
    marginLeft: rem(6),
  },
  wrongStyle: {
    backgroundColor: COLORS.attention,
  },
  correctStyle: {
    backgroundColor: COLORS.shamrock,
  },
});
