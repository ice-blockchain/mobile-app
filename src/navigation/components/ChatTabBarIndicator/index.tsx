// SPDX-License-Identifier: ice License 1.0

import {COLORS} from '@constants/colors';
import {CHAT_TAB_BAR_PADDING} from '@navigation/components/ChatTabBar';
import {ParamListBase, TabNavigationState} from '@react-navigation/native';
import * as React from 'react';
import {Animated, I18nManager, StyleSheet} from 'react-native';
import {Route, TabBar} from 'react-native-tab-view';
import {rem} from 'rn-units';

export type GetTabWidth = (index: number) => number;

const WIDTH = rem(30);

const getTranslateX = (
  position: Animated.AnimatedInterpolation<number>,
  routes: Route[],
  getTabWidth: GetTabWidth,
  scaleOutputRange: number[],
) => {
  const inputRange = routes.map((_, i) => i);

  const outputRange = routes.reduce<number[]>((acc, _, i) => {
    const offset = (scaleOutputRange[i] * WIDTH - WIDTH) / 2;
    if (i === 0) {
      return [CHAT_TAB_BAR_PADDING + offset];
    }
    const prevOffset = (scaleOutputRange[i - 1] * WIDTH - WIDTH) / 2;
    return [...acc, acc[i - 1] - prevOffset + getTabWidth(i - 1) + offset];
  }, []);
  const translateX = position.interpolate({
    inputRange,
    outputRange,
    extrapolate: 'clamp',
  });

  return Animated.multiply(translateX, I18nManager.isRTL ? -1 : 1);
};

export function ChatTabBarIndicator({
  getTabWidth,
  layout,
  state,
  position,
}: Omit<
  Parameters<
    NonNullable<React.ComponentProps<typeof TabBar>['renderIndicator']>
  >[0],
  'navigationState'
> & {state: TabNavigationState<ParamListBase>}) {
  const {routes} = state;

  const transform = [];

  const inputRange = routes.map((_, i) => i);
  const outputRange = inputRange.map(index =>
    Math.max((getTabWidth(index) - CHAT_TAB_BAR_PADDING * 2) / WIDTH, 1),
  );

  if (layout.width) {
    const translateX = getTranslateX(
      position,
      routes,
      getTabWidth,
      outputRange,
    );
    transform.push({translateX});
  }
  transform.push({
    scaleX: position.interpolate({
      inputRange,
      outputRange,
      extrapolate: 'clamp',
    }),
  });
  return <Animated.View style={[styles.indicator, {transform}]} />;
}

const styles = StyleSheet.create({
  indicator: {
    position: 'absolute',
    backgroundColor: COLORS.primaryDark,
    borderTopRightRadius: 4,
    borderTopLeftRadius: 4,
    bottom: 0,
    left: 0,
    height: 3,
    width: WIDTH,
  },
});
