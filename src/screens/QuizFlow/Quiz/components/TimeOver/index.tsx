// SPDX-License-Identifier: ice License 1.0

import {t} from '@translations/i18n';
import {font} from '@utils/styles';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {rem} from 'rn-units';

type Props = {
  visible: boolean;
};

export const TimeOver = ({visible}: Props) => {
  return (
    <View style={styles.container}>
      {visible && (
        <Text style={styles.text}>
          {t('quiz.quiz_questionnaire.time_over')}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: rem(40),
    marginVertical: rem(20),
    justifyContent: 'center',
  },
  text: {
    ...font(14, 18, 'regular', 'primaryDark', 'center'),
  },
});
