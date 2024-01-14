// SPDX-License-Identifier: ice License 1.0

import {windowWidth} from '@constants/styles';
import {Answer} from '@screens/QuizFlow/Quiz/components/QuestionPage/components/Answer';
import {useQuestionPage} from '@screens/QuizFlow/Quiz/components/QuestionPage/hooks/useQuestionPage';
import {font} from '@utils/styles';
import React, {useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {rem} from 'rn-units';
type Props = {
  onAnswerSelected: (index: number) => void;
  selectedIndex: number | null;
};

export const QuestionPage = ({
  onAnswerSelected,
  selectedIndex,
  ...props
}: Props) => {
  const animation = useSharedValue(0);

  const {questionTitle, options} = useQuestionPage();

  const [allOptions, setAllOptions] = React.useState<string[]>(options);

  const handlePress = (answerIndex: number) => {
    onAnswerSelected(answerIndex);
  };

  useEffect(() => {
    const animateTransition = () => {
      animation.value = withTiming(
        1,
        {
          duration: 300,
          easing: Easing.linear,
        },
        () => {
          animation.value = 0;
        },
      );
    };

    if (allOptions && options && allOptions !== options) {
      setAllOptions(options);
      console.log('animateTransition');
      animateTransition();
    }
  }, [allOptions, animation, options]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{translateX: animation.value * -windowWidth}],
    };
  });

  return (
    <Animated.View style={[styles.container, animatedStyle]} {...props}>
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
