// SPDX-License-Identifier: ice License 1.0

import {COLORS} from '@constants/colors';
import i18n from '@translations/i18n';
import {font} from '@utils/styles';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {rem} from 'rn-units';

export type ResultType = 'success' | 'failed' | 'timeOut';

type Props = {
  type?: ResultType | null;
};

export const Result = ({type}: Props) => {
  const localizationForType = () => {
    let text = '';
    switch (type) {
      case 'success':
        text = i18n.t('quiz.quiz_questionnaire.correct_answer');
        break;
      case 'failed':
        text = i18n.t('quiz.quiz_questionnaire.wrong_answer');
        break;
      case 'timeOut':
        text = i18n.t('quiz.quiz_questionnaire.time_over');
        break;
    }
    return text;
  };

  const styleForType = () => {
    let style = {};
    switch (type) {
      case 'success':
        style = styles.successAnswer;
        break;
      case 'failed':
        style = styles.wrongAnswer;
        break;
    }
    return style;
  };

  return (
    <View style={styles.container}>
      {type && (
        <Text style={[styles.text, styleForType()]}>
          {localizationForType()}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: rem(81),
  },
  text: {
    ...font(14, 19, 'regular', 'primaryDark', 'center'),
  },
  wrongAnswer: {
    color: COLORS.attention,
  },
  successAnswer: {
    color: COLORS.shamrock,
  },
});
