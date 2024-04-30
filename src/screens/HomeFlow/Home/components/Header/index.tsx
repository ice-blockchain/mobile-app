// SPDX-License-Identifier: ice License 1.0

import {FormattedNumber} from '@components/Labels/FormattedNumber';
import {IceLabel} from '@components/Labels/IceLabel';
import {COLORS} from '@constants/colors';
import {isLightDesign} from '@constants/featureFlags';
import {SCREEN_SIDE_OFFSET} from '@constants/styles';
import {useTopOffsetStyle} from '@navigation/hooks/useTopOffsetStyle';
import {useUserGreetingWalkthrough} from '@screens/HomeFlow/Home/components/Header/components/hooks/useUserGreetingWalkthrough';
import {MenuButton} from '@screens/HomeFlow/Home/components/Header/components/MenuButton';
import {UserGreeting} from '@screens/HomeFlow/Home/components/Header/components/UserGreeting';
import {useTransitionAnimation} from '@screens/HomeFlow/Home/components/Header/hooks/useTransitionAnimation';
import {balanceSummarySelector} from '@store/modules/Tokenomics/selectors';
import {isRTL} from '@translations/i18n';
import {formatNumberString} from '@utils/numbers';
import {font} from '@utils/styles';
import React, {memo} from 'react';
import {StyleSheet, View} from 'react-native';
import Animated, {SharedValue} from 'react-native-reanimated';
import {useSelector} from 'react-redux';
import {rem} from 'rn-units';

type Props = {
  translateY: SharedValue<number>;

  // scroll offset when to start transition animation from 1 state to another
  transitionOffset: number;
};

export const HomeHeader = memo(({translateY, transitionOffset}: Props) => {
  const topOffset = useTopOffsetStyle();
  const balanceSummary = useSelector(balanceSummarySelector);

  const {currentAnimationState, fromAnimatedStyle, toAnimatedStyle} =
    useTransitionAnimation({
      translateY,
      transitionOffset,
    });

  const {elementRef, onElementLayout} = useUserGreetingWalkthrough();

  return (
    <View style={[styles.container, topOffset.current]}>
      <View style={styles.body}>
        <View
          ref={elementRef}
          onLayout={onElementLayout}
          style={styles.userGreetingContainer}>
          <UserGreeting
            disabled={currentAnimationState !== 'from'}
            animatedStyle={fromAnimatedStyle}
          />
        </View>

        <Animated.View
          pointerEvents={'none'}
          style={[StyleSheet.absoluteFill, styles.balance, toAnimatedStyle]}>
          <FormattedNumber
            number={
              balanceSummary ? formatNumberString(balanceSummary.total) : ''
            }
            bodyStyle={styles.balanceText}
            decimalsStyle={styles.balanceDecimalsText}
          />
          <IceLabel
            iconSize={16}
            iconOffsetY={0}
            color={COLORS.primaryDark}
            textStyle={styles.currencyText}
          />
        </Animated.View>

        {isLightDesign ? null : <MenuButton />}
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
  },
  body: {
    paddingHorizontal: SCREEN_SIDE_OFFSET,
    flexDirection: 'row',
    alignItems: 'center',
    height: rem(72),
  },
  balance: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  balanceText: {
    ...font(17, 22, 'black', 'primaryDark'),
  },
  balanceDecimalsText: {
    ...font(10, 12, 'black', 'primaryDark'),
    marginBottom: rem(10),
  },
  currencyText: {
    ...font(13, 21, 'semibold', 'primaryDark'),
  },
  greeting: {
    marginLeft: rem(10),
    flex: 1,
    flexDirection: isRTL ? 'row' : 'column',
    justifyContent: isRTL ? 'flex-start' : 'flex-end',
  },
  usernameText: {
    marginTop: rem(3),
    ...font(15, 20, 'bold', 'downriver'),
  },
  icons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    padding: rem(7),
  },
  userGreetingContainer: {
    flex: 1,
  },
});
