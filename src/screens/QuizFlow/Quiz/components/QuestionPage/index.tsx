// SPDX-License-Identifier: ice License 1.0

import {Answer} from '@screens/QuizFlow/Quiz/components/QuestionPage/components/Answer';
import {useAnimateOptions} from '@screens/QuizFlow/Quiz/components/QuestionPage/hooks/useAnimateOptions';
import {
  questionOptionsSelector,
  questionTitleSelector,
} from '@store/modules/Quiz/selectors';
import {font} from '@utils/styles';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Animated from 'react-native-reanimated';
import {useSelector} from 'react-redux';
import {rem} from 'rn-units';

type Props = {
  onAnswerSelected: (index: number) => void;
  selectedIndex: number | null;
};

export const QuestionPage = ({onAnswerSelected, selectedIndex}: Props) => {
  const questionTitle = useSelector(questionTitleSelector);
  const options = useSelector(questionOptionsSelector);

  const handlePress = (answerIndex: number) => {
    onAnswerSelected(answerIndex);
  };

  const {animatedStyle} = useAnimateOptions({options});

  return (
    <Animated.View style={[styles.container, animatedStyle]}>
      <Text style={styles.title}>{questionTitle}</Text>
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
