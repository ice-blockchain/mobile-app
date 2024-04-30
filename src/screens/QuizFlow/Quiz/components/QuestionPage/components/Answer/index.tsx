// SPDX-License-Identifier: ice License 1.0

import {COLORS} from '@constants/colors';
import {commonStyles} from '@constants/styles';
import {QuizSelectedIcon} from '@svg/QuizSelectedIcon';
import {QuizUnselectedIcon} from '@svg/QuizUnselectedIcon';
import {font} from '@utils/styles';
import React from 'react';
import {StyleSheet, Text, TouchableWithoutFeedback, View} from 'react-native';
import {rem} from 'rn-units';

type Props = {
  answer: string;
  isSelected: boolean;
  onPress: (index: number) => void;
  answerIndex: number;
};
export const Answer = ({answer, isSelected, onPress, answerIndex}: Props) => {
  return (
    <TouchableWithoutFeedback
      style={styles.container}
      onPress={() => {
        onPress(answerIndex);
      }}>
      <View
        style={[
          styles.itemContainer,
          commonStyles.shadow,
          isSelected ? styles.selected : styles.unselected,
        ]}>
        <View style={styles.checkboxContainer}>
          {isSelected ? <QuizSelectedIcon /> : <QuizUnselectedIcon />}
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.text}>{answer}</Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  itemContainer: {
    marginVertical: rem(8),
    backgroundColor: COLORS.white,
    minHeight: rem(69),
    borderRadius: rem(16),
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'row',
  },
  checkboxContainer: {
    justifyContent: 'center',
    marginLeft: rem(12),
  },
  text: {
    ...font(14, 19, 'medium', 'primaryDark', 'left'),
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
    marginRight: rem(12),
    marginLeft: rem(24),
    marginVertical: rem(8),
  },
  selected: {
    borderColor: COLORS.primaryLight,
    borderWidth: 1,
  },
  unselected: {
    borderColor: COLORS.transparent,
    borderWidth: 1,
  },
});
