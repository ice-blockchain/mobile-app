// SPDX-License-Identifier: ice License 1.0

import {useSafeAreaInsets} from '@hooks/useSafeAreaInsets';
import {
  MAIN_TAB_BAR_HEIGHT,
  MAIN_TAB_BAR_MAX_OFFSET,
} from '@navigation/components/MainTabBar';
import {TAB_BAR_MINING_ITEM_TOP_OFFSET} from '@navigation/components/MainTabBar/components/TabBarMiningItem';
import {BottomTabBarHeightContext} from '@react-navigation/bottom-tabs';
import {useContext, useMemo} from 'react';
import {StyleSheet} from 'react-native';
import {rem} from 'rn-units';

type Params = {
  extraOffset?: number;
};

export const useBottomTabBarOffsetStyle = ({extraOffset}: Params = {}) => {
  const hasTabBar = !!useContext(BottomTabBarHeightContext);
  const {bottom: bottomInset} = useSafeAreaInsets();
  const tabbarBottomOffset = Math.min(
    rem(MAIN_TAB_BAR_MAX_OFFSET),
    bottomInset,
  );
  const extraPadding = extraOffset ?? rem(4);

  return useMemo(
    () =>
      StyleSheet.create({
        current: {
          paddingBottom: hasTabBar
            ? MAIN_TAB_BAR_HEIGHT +
              tabbarBottomOffset +
              TAB_BAR_MINING_ITEM_TOP_OFFSET +
              extraPadding
            : bottomInset + extraPadding,
        },
      }),
    [extraPadding, bottomInset, hasTabBar, tabbarBottomOffset],
  );
};
