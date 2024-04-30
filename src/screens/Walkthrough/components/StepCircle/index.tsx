// SPDX-License-Identifier: ice License 1.0

import {Touchable} from '@components/Touchable';
import {MIDDLE_BUTTON_HIT_SLOP, windowWidth} from '@constants/styles';
import {Images} from '@images';
import {NextButton} from '@screens/Walkthrough/components/StepCircle/components/NextButton';
import {StepParsedDescription} from '@screens/Walkthrough/components/StepCircle/components/StepParsedDescription';
import {useCirclePosition} from '@screens/Walkthrough/components/StepCircle/hooks/useCirclePosition';
import {CIRCLE_DIAMETER} from '@screens/Walkthrough/constants';
import {WalkthroughStep} from '@store/modules/Walkthrough/types';
import {t} from '@translations/i18n';
import {font} from '@utils/styles';
import React from 'react';
import {Image, StyleSheet, Text, View, ViewStyle} from 'react-native';
import Animated, {AnimatedStyleProp} from 'react-native-reanimated';
import {rem} from 'rn-units';

type Props = {
  step: WalkthroughStep;
  totalSteps: number;
  stepIndex: number;
  elementHeight: number | undefined;
  elementTop: number | undefined;
  onNext: () => void;
  onSkip: () => void;
  animatedStyle?: AnimatedStyleProp<ViewStyle>;
};

export const StepCircle = ({
  step,
  totalSteps,
  stepIndex,
  elementHeight,
  elementTop,
  onNext,
  onSkip,
  animatedStyle,
}: Props) => {
  const circlePosition = useCirclePosition({
    elementHeight,
    elementTop,
    circlePosition: step.circlePosition,
  });

  return (
    <Animated.View
      style={[
        styles.circleContainer,
        animatedStyle,
        circlePosition,
        step.zIndex ? {zIndex: step.zIndex} : null,
      ]}>
      <Image
        source={Images.backgrounds.walkthroughBg}
        style={styles.backgroundImage}
      />
      <View style={styles.titleContainer}>
        {step.Icon ? (
          <View style={styles.iconContainer}>{step.Icon}</View>
        ) : null}
        <Text style={styles.titleText}>{step.title}</Text>
      </View>
      <Text style={styles.description} numberOfLines={5}>
        <StepParsedDescription step={step} />
      </Text>
      <View style={styles.controls}>
        <Touchable onPress={onSkip} hitSlop={MIDDLE_BUTTON_HIT_SLOP}>
          <Text style={styles.skipAll}>{t('button.skip_all')}</Text>
        </Touchable>
        <NextButton
          totalSteps={totalSteps}
          stepIndex={stepIndex}
          onPress={onNext}
        />
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  circleContainer: {
    position: 'absolute',
    justifyContent: 'center',
    width: windowWidth,
    height: CIRCLE_DIAMETER,
    paddingHorizontal: rem(30),
  },
  backgroundImage: {
    width: CIRCLE_DIAMETER,
    height: CIRCLE_DIAMETER,
    position: 'absolute',
    alignSelf: 'center',
    top: 0,
  },
  controls: {
    marginTop: rem(10),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    marginRight: rem(12),
  },
  titleText: {
    ...font(20, 25, 'bold'),
  },
  description: {
    marginTop: rem(16),
    height: rem(120),
    ...font(14, 24, 'medium'),
  },
  skipAll: {
    ...font(14, 19, 'medium'),
  },
});
