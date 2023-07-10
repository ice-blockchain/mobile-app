// SPDX-License-Identifier: ice License 1.0

import {COLORS} from '@constants/colors';
import useIsKeyboardShown from '@hooks/useIsKeyboardShown';
import {TabBarItem} from '@navigation/components/MainTabBar/components/TabBarItem';
import {TabBarMiningItem} from '@navigation/components/MainTabBar/components/TabBarMiningItem';
import {BottomTabBarProps} from '@react-navigation/bottom-tabs';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {rem} from 'rn-units';

export const MAIN_TAB_BAR_HEIGHT = rem(74);
export const MAIN_TAB_BAR_MAX_OFFSET = rem(12);

const NUMBER_OF_LEFT_ICONS = 2;
const NUMBER_OF_RIGHT_ICONS = 2;

export const MainTabBar = ({
  state,
  descriptors,
  navigation,
  insets,
}: BottomTabBarProps) => {
  const leftRoutes = state.routes.slice(0, NUMBER_OF_LEFT_ICONS);
  const rightRoutes = state.routes.slice(-NUMBER_OF_RIGHT_ICONS);

  const bottomOffset = Math.min(rem(MAIN_TAB_BAR_MAX_OFFSET), insets.bottom);

  const isKeyboardShown = useIsKeyboardShown();

  const {tabBarHideOnKeyboard = false} =
    descriptors[state.routes[state.index].key].options;

  const hideTabBar = tabBarHideOnKeyboard && isKeyboardShown;

  if (hideTabBar) {
    return null;
  }

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.buttons,
          {
            height: MAIN_TAB_BAR_HEIGHT + bottomOffset,
            borderBottomWidth: bottomOffset,
          },
        ]}>
        {leftRoutes.map((route, index) => (
          <TabBarItem
            key={route.key}
            name={route.name}
            index={index}
            navigation={navigation}
            state={state}
            descriptors={descriptors}
            insets={insets}
          />
        ))}

        <TabBarMiningItem />

        {rightRoutes.map((route, index) => (
          <TabBarItem
            key={route.key}
            name={route.name}
            index={index + NUMBER_OF_LEFT_ICONS}
            navigation={navigation}
            state={state}
            descriptors={descriptors}
            insets={insets}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
    position: 'absolute',
    left: 0,
    bottom: 0,
    right: 0,
  },
  buttons: {
    flexDirection: 'row',
    borderBottomColor: COLORS.white,
  },
});
