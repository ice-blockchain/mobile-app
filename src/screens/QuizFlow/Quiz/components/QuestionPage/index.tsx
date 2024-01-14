// SPDX-License-Identifier: ice License 1.0

import {Answer} from '@screens/QuizFlow/Quiz/components/QuestionPage/components/Answer';
import {useAnimateOptions} from '@screens/QuizFlow/Quiz/components/QuestionPage/hooks/useAnimateOptions';
import {font} from '@utils/styles';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Animated from 'react-native-reanimated';
import {rem} from 'rn-units';

type Props = {
  onAnswerSelected: (index: number) => void;
  selectedIndex: number | null;
  question: string;
  options: string[];
};

export const QuestionPage = ({
  onAnswerSelected,
  selectedIndex,
  question,
  options,
}: Props) => {
  const handlePress = (answerIndex: number) => {
    onAnswerSelected(answerIndex);
  };

  const {animatedStyle} = useAnimateOptions({options});

  return (
    <Animated.View style={[styles.container, animatedStyle]}>
      <Text style={styles.title}>{question}</Text>
      <View style={styles.answersContainer}>
        {options.map((answer: string, index: number) => {
          return (
            <Answer
              key={answer}
              answer={answer}
              isSelected={selectedIndex === index}
              onPress={handlePress}
              answerIndex={index}
            />
          );
        })}
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: rem(16),
  },
  answersContainer: {
    marginTop: rem(20),
    paddingHorizontal: rem(16),
  },
  title: {
    ...font(24, 30, 'bold', 'primaryDark', 'center'),
    marginTop: rem(30),
    marginHorizontal: rem(38),
  },
});
